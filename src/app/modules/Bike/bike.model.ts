import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "pricePerHour is require"],
    },
    cc: {
      type: Number,
      required: [true, "cc is require"],
    },
    year: {
      type: Number,
      required: [true, "year is require"],
    },
    model: {
      type: String,
      required: [true, "model is require"],
    },
    brand: {
      type: String,
      required: [true, "brand is require"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  }
);

export const Bike = model<TBike>("Bike", bikeSchema);
