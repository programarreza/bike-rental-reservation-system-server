import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import {
  createRental,
  getMyRentals,
  paymentFail,
  paymentSuccess,
  updateReturnBike,
} from "./rental.controller";
import { createRentalValidationSchema } from "./rental.validation";

const rentalRoutes = Router();

rentalRoutes.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(createRentalValidationSchema),
  createRental
);

rentalRoutes.put("/:id/return", auth(USER_ROLE.admin), updateReturnBike);

rentalRoutes.get("/me", auth(USER_ROLE.user, USER_ROLE.admin), getMyRentals);

rentalRoutes.post("/payment/success/:tranId", paymentSuccess);
rentalRoutes.post("/payment/fail/:tranId", paymentFail);

export default rentalRoutes;
