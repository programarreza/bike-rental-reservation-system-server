import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { getUserProfile, updateUserProfile } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateUserValidationSchema } from "./user.validation";

const userRoutes = Router();

userRoutes.get("/me", auth(USER_ROLE.user, USER_ROLE.admin), getUserProfile);

userRoutes.put(
  "/me",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  updateUserProfile
);

export default userRoutes;
