import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "./user.model";

const getUserProfileFromDB = async (payload: string) => {
  const result = await User.findOne({ email: payload });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  }

  return result;
};

export { getUserProfileFromDB };
