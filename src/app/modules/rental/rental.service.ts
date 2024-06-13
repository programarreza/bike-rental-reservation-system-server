import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TRental } from "./rental.interface";
import { Rental } from "./rental.model";
import { Bike } from "../Bike/bike.model";

const createRentalIntoDB = async (email: string, payload: TRental) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  //  set user id from user token
  payload.userId = user?._id;

  // find bike and update isAvailable status false
  const bikeStatus = await Bike.findByIdAndUpdate(
    { _id: payload?.bikeId },
    { isAvailable: false },
    { new: true, runValidators: true }
  );

  if (!bikeStatus) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "failed to bike available status update "
    );
  }

  const result = Rental.create(payload);
  return result;
};

export { createRentalIntoDB };
