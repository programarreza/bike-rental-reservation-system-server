import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { USER_ROLE } from "../user/user.constant";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

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

export const AuthService = {
  signup,
};
