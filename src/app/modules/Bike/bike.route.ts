import { Router } from "express";
import { createBike, getAllBikes } from "./bike.controller";
import validateRequest from "../../middleware/validateRequest";
import { createBikeValidationSchema } from "./bike.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const bikeRoutes = Router();

bikeRoutes.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createBikeValidationSchema),
  createBike
);
bikeRoutes.get("/", getAllBikes)

export default bikeRoutes;
