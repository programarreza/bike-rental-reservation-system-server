import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getUserProfileFromDB, updateUserProfileFromDB } from "./user.service";

const getUserProfile = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result = await getUserProfileFromDB(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await updateUserProfileFromDB(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export { getUserProfile, updateUserProfile };
