import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const isBikeExist = await Bike.findById(id);
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike is not found !");
  }

  const updateBike = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updateBike) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to bike update!");
  }

  return updateBike;
};

const deleteBikeIntoDB = async (id: string) => {
  const isBikeExist = await Bike.findById(id);
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike is not found !");
  }

  const deletedBike = Bike.findByIdAndDelete(id);
  if (!deletedBike) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to bike delete!");
  }

  return deletedBike;
};

export {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeIntoDB,
};
