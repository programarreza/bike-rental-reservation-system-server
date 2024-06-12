import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registration successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successfully",
    data: { accessToken },
  });
});

export { signup, login };
