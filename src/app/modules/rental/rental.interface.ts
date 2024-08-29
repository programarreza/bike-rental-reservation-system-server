import { Types } from "mongoose";

export type TRental = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  transactionId: string;
  advanced: number;
  isAdvanced: boolean;
  isPaid: boolean;
  isReturned: boolean;
};
