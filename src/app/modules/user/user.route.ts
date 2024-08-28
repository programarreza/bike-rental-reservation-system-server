import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import {
  deleteUser,
  getAllUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
} from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateUserValidationSchema } from "./user.validation";

const userRoutes = Router();

userRoutes.get("/me", auth(USER_ROLE.user, USER_ROLE.admin), getUserProfile);
userRoutes.get("/", auth(USER_ROLE.admin), getAllUser);

userRoutes.put(
  "/me",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  updateUserProfile
);

userRoutes.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  updateUser
);

userRoutes.delete("/:id", auth(USER_ROLE.admin), deleteUser);

export default userRoutes;
