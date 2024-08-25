import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { bikeSearchableField } from "./bike.constant";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {

  const bikeQuery = new QueryBuilder(Bike.find({isAvailable: true}), query)
    .search(bikeSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();

  return {
    result,
    meta,
  };
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
