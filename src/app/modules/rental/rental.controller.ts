/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Bike } from "../Bike/bike.model";
import { User } from "../user/user.model";
import { Rental } from "./rental.model";
import {
  createRentalIntoDB,
  getMyRentalsFromDB,
  getRentalsFromDB,
  updateReturnBikeIntoDB,
} from "./rental.service";

const createRental = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { advanced } = req.body;

  // Find the user to get the userId
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Generate a unique transaction ID
  const tranID = uuidv4();

  // Initiate payment
  const sslcz = new SSLCommerzPayment(
    config.store_id,
    config.store_pass,
    config.is_live
  );

  const paymentData = {
    total_amount: advanced, // Use the advanced payment amount
    currency: "BDT",
    tran_id: tranID,
    success_url: `${config.base_url}/api/rentals/payment/success/${tranID}`,
    fail_url: `${config.base_url}/api/rentals/payment/fail/${tranID}`,
    cancel_url: `${config.base_url}/api/rentals/payment/cancel/${tranID}`,
    product_name: "Bike Rental",
    cus_name: req.user.name,
    cus_email: email,
    shipping_method: "email",
    product_category: "rental",
    product_profile: "general",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    // Add additional customer details if needed
  };

  // Attempt to initiate payment
  const apiResponse = await sslcz.init(paymentData);

  if (apiResponse?.GatewayPageURL) {
    const paymentUrl = apiResponse.GatewayPageURL;

    // Create rental in the database with the transaction ID
    const rentalData = { ...req.body, transactionId: tranID, userId: user._id };
    await createRentalIntoDB(email, rentalData);

    // Respond with the payment URL
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental created successfully. Proceed to payment.",
      data: paymentUrl,
    });
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to initiate payment.");
  }
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const bikeId = rental.bikeId;

    // Update the bike's availability status to false
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: false },
      { new: true, session }
    );

    if (!updatedBike) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update bike availability status"
      );
    }

    // Mark the payment as successful and the bike as rented
    rental.isAdvanced = true;
    await rental.save({ session });

    await session.commitTransaction();
    await session.endSession();

    if (rental.isAdvanced) {
      const paymentUrl = `${config.client_url}/payment/success/${tranId}?amount=${rental.advanced}&date=${new Date().toISOString()}`;

      return res.redirect(paymentUrl);
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment successful. Rental updated.",
      data: rental,
    });
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
});

const paymentFail = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  // Delete the rental entry as the payment has failed
  const result = await Rental.deleteOne({ transactionId: tranId });
  if (result.deletedCount) {
    // Redirect the user to a failure page
    return res.redirect(`${config.client_url}/payment/failed/${tranId}`);
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental record deleted successfully due to payment failure",
  });
});


const paymentClose = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  // Delete the rental entry as the payment has failed
  const result = await Rental.deleteOne({ transactionId: tranId });
  if (result.deletedCount) {
    // Redirect the user to a failure page
    return res.redirect(`${config.client_url}/payment/cancel/${tranId}`);
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental record deleted successfully due to payment failure",
  });
});

const updateReturnBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateReturnBikeIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike returned successfully",
    data: result,
  });
});

const getMyRentals = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { isPaid } = req.query;

  const result = await getMyRentalsFromDB(email, isPaid as string);

  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const getRentals = catchAsync(async (req, res) => {
  const result = await getRentalsFromDB();

  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export {
  createRental,
  getMyRentals,
  paymentFail,
  paymentSuccess,
  updateReturnBike,
  getRentals,
  paymentClose
};
