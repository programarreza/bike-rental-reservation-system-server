import { Schema, model } from "mongoose";
import { TContact } from "./contact.interface";

const contactSchema = new Schema<TContact>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: false,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const Contact = model<TContact>("Contact", contactSchema);
