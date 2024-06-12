import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getUserProfileFromDB } from "./user.service";

const getUserProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await getUserProfileFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export { getUserProfile };
