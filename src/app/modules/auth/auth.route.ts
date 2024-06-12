import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createUserValidationSchema } from "../user/user.validation";
import { login, signup } from "./auth.controller";
import { loginUserValidationSchema } from "./auth.validation";

const userRoutes = Router();

userRoutes.post("/signup", validateRequest(createUserValidationSchema), signup);
userRoutes.post("/login", validateRequest(loginUserValidationSchema),login)

export default userRoutes;
