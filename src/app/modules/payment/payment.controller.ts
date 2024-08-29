import httpStatus from "http-status";
import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Rental } from "../rental/rental.model";
import { User } from "../user/user.model";

const createPayment = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { transactionId } = req.body;

  // Find the user to get the userId
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const rentTranInfo = await Rental.findOne({ transactionId });

  // Generate a unique transaction ID
  const tranID = rentTranInfo?.transactionId;

  //  Initiate payment
  const sslcz = new SSLCommerzPayment(
    config.store_id,
    config.store_pass,
    config.is_live
  );

  const paymentData = {
    total_amount: rentTranInfo?.totalCost, // Use the advanced payment amount
    currency: "BDT",
    tran_id: tranID,
    success_url: `${config.base_url}/api/payments/payment/success/${tranID}`,
    fail_url: `${config.base_url}/api/payments/payment/fail/${tranID}`,
    cancel_url: `${config.base_url}/api/payments/payment/cancel/${tranID}`,
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

  //  Attempt to initiate payment
  const apiResponse = await sslcz.init(paymentData);

  if (apiResponse?.GatewayPageURL) {
    const paymentUrl = apiResponse.GatewayPageURL;

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

const paymentComplete = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  // Mark the payment as successful and the bike as rented
  rental.isPaid = true;
  await rental.save();

  if (rental.isPaid) {
    const paymentUrl = `http://localhost:5173/payment/success/${tranId}?amount=${rental.totalCost}&date=${new Date().toISOString()}`;

    return res.redirect(paymentUrl);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment successful. Rental updated.",
    data: rental,
  });
});

const paymentFailed = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  // Delete the rental entry as the payment has failed
  //   const result = await Rental.deleteOne({ transactionId: tranId });
  if (rental) {
    // Redirect the user to a failure page
    return res.redirect(`http://localhost:5173/payment/failed/${tranId}`);
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental record deleted successfully due to payment failure",
  });
});

const paymentCancel = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  // Find the rental by transaction ID
  const rental = await Rental.findOne({ transactionId: tranId });
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  if (rental) {
    // Redirect the user to a failure page
    return res.redirect(`http://localhost:5173/payment/cancel/${tranId}`);
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental record deleted successfully due to payment failure",
  });
});

export { createPayment, paymentCancel, paymentComplete, paymentFailed };
