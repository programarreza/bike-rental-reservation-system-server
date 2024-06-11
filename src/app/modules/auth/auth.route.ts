import { Router } from "express";
import { signup } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { createUserValidationSchema } from "../user/user.validation";

const userRoutes = Router();

userRoutes.post("/signup", validateRequest(createUserValidationSchema), signup);

export default userRoutes;
