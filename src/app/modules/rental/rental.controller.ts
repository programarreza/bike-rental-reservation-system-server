import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createRentalIntoDB } from "./rental.service";

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

export { createRental };
