/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TRole = "user" | "admin";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
