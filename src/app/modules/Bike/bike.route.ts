import { Router } from "express";
import {
  createBike,
  deleteBike,
  getAllBikes,
  updateBike,
} from "./bike.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from "./bike.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const bikeRoutes = Router();

bikeRoutes.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createBikeValidationSchema),
  createBike
);

bikeRoutes.get("/",auth(USER_ROLE.admin, USER_ROLE.user), getAllBikes);

bikeRoutes.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateBikeValidationSchema),
  updateBike
);

bikeRoutes.delete("/:id", auth(USER_ROLE.admin), deleteBike);

export default bikeRoutes;
