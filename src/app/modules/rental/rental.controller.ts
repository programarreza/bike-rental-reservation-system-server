import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createRentalIntoDB,
  getAllRentalsFromDB,
  updateReturnBikeIntoDB,
} from "./rental.service";

const createRental = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await createRentalIntoDB(email, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully",
    data: result,
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

const getAllRentals = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await getAllRentalsFromDB(email);

  if (!result || result.length === 0) {
    sendResponse(res, {
      success: false,
      message: "No Data Found",
      data: [],
    });
    return;
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export { createRental, getAllRentals, updateReturnBike };
