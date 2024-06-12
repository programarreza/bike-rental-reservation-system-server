import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBikeIntoDB } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const newBike = await createBikeIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike added successfully",
    data: newBike,
  });
});

export { createBike };
