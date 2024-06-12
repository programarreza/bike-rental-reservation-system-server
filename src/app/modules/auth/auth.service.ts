import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { USER_ROLE } from "../user/user.constant";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const signup = async (payload: TUser) => {
  const user = await User.findOne({ email: payload?.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User is already exists");
  }

  // set user role default : user
  payload.role = USER_ROLE.user;
  // create a user
  const newUser = await User.create(payload);
  return newUser;
};

const login = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user is not found!");
  }

  // checking  password
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!!");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // create access token & send
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  signup,
  login,
};
