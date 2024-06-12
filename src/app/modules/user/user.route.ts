import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { getUserProfile } from "./user.controller";

const userRoutes = Router();

userRoutes.get("/me", auth(USER_ROLE.user), getUserProfile);

export default userRoutes;
