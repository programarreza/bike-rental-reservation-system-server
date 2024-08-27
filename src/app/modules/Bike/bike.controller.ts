import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createBikeIntoDB,
  deleteBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
} from "./bike.service";

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
  const result = await getAllBikesFromDB(req.query);

  // if (!result || result?.length === 0) {
  //   sendResponse(res, {
  //     success: false,
  //     message: "No Data Found",
  //     data: [],
  //   });
  //   return;
  // }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bikes retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBikes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleBikeFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike retrieved successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateBikeIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bikes is updated successfully",
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await deleteBikeIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike deleted successfully",
    data: result,
  });
});

export { createBike, getAllBikes, updateBike, deleteBike, getSingleBikes };
