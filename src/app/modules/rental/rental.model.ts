import { Schema, model } from "mongoose";
import { TRental } from "./rental.interface";

const rentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: "Bike",
    required: [true, "bikeId is required"],
  },
  startTime: {
    type: Date,
    required: [true, "startTime is required"],
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  transactionId: {
    type: String,
    required: true,
  },
  advanced: {
    type: Number,
    required: true,
    default: 0,
  },
  isAdvanced: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

export const Rental = model<TRental>("Rental", rentalSchema);
