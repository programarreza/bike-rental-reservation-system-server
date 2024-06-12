import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBikeIntoDB, getAllBikesIntoDB } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const newBike = await createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike added successfully",
    data: newBike,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const newBike = await getAllBikesIntoDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bikes retrieved successfully",
    data: newBike,
  });
});

export { createBike, getAllBikes };
