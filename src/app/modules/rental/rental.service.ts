/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TRental } from "./rental.interface";
import { Rental } from "./rental.model";
import { Bike } from "../Bike/bike.model";
import mongoose from "mongoose";

const createRentalIntoDB = async (email: string, payload: TRental) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  //  set user id from user token
  // payload.userId = user?._id;

  // // find bike and update isAvailable status false
  // const bikeStatus = await Bike.findByIdAndUpdate(
  //   { _id: payload?.bikeId },
  //   { isAvailable: false },
  //   { new: true, runValidators: true }
  // );

  // if (!bikeStatus) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "failed to bike available status update "
  //   );
  // }

  const result = Rental.create(payload);
    if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "failed to create bike rent"
    );
  }
  return result;
};

const updateReturnBikeIntoDB = async (id: string) => {
  // find rental bike
  const rentalBike = await Rental.findById(id);
  if (!rentalBike) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // update bike isAvailable set true (Transaction-1)
    const bikeId = rentalBike?.bikeId;

    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: true },
      { new: true, session }
    );

    if (!updatedBike) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update bike availability status"
      );
    }

    // price per hour
    const pricePerHour = updatedBike?.pricePerHour;
    const startTime = new Date(rentalBike?.startTime);
    const returnTime = new Date();

    // Calculate total hours and minutes
    const totalMilliseconds = returnTime.getTime() - startTime.getTime();
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.ceil(
      (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Adjust total hours if total minutes exceed 60
    const adjustedTotalHours = totalHours + Math.floor(totalMinutes / 60);
    const adjustedTotalMinutes = totalMinutes % 60;

    const totalHour = adjustedTotalHours + adjustedTotalMinutes / 100; // combine adjusted hours and minutes into a decimal
    const totalCost = parseFloat((totalHour * pricePerHour).toFixed(2));

    // update rental bike booking (Transaction-2)
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      {
        returnTime: returnTime.toISOString(),
        totalCost: totalCost,
        isReturned: true,
      },
      { new: true, session }
    );

    if (!updatedRental) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update rental information "
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return updatedRental;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllRentalsFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await Rental.find({ userId: user?._id });
  return result;
};

export { createRentalIntoDB, updateReturnBikeIntoDB, getAllRentalsFromDB };
