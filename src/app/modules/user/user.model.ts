import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: Object.keys(USER_ROLE),
    },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userSchema);
