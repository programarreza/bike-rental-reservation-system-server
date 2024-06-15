import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import {
  createRental,
  getAllRentals,
  updateReturnBike,
} from "./rental.controller";
import validateRequest from "../../middleware/validateRequest";
import { createRentalValidationSchema } from "./rental.validation";

const rentalRoutes = Router();

rentalRoutes.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(createRentalValidationSchema),
  createRental
);

rentalRoutes.put("/:id/return", auth(USER_ROLE.admin), updateReturnBike);

rentalRoutes.get("/", auth(USER_ROLE.user, USER_ROLE.admin), getAllRentals);

export default rentalRoutes;
