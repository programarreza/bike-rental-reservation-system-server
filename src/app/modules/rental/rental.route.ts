import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { createRental } from "./rental.controller";
import validateRequest from "../../middleware/validateRequest";
import { createRentalValidationSchema } from "./rental.validation";

const rentalRoutes = Router();

rentalRoutes.post("/", auth(USER_ROLE.user, USER_ROLE.admin),validateRequest(createRentalValidationSchema),  createRental);

export default rentalRoutes;
