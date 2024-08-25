import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createContactMessageInDB,
  getAllContactMessageFromDB,
} from "./contact.service";

const createContactMessage = catchAsync(async (req, res) => {
  const result = await createContactMessageInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "This message submit successfully",
    data: result,
  });
});

const getAllContactMessage = catchAsync(async (req, res) => {
  const result = await getAllContactMessageFromDB(req.params);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact message retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export { createContactMessage, getAllContactMessage };
