import { Router } from "express";
import {
  createPayment,
  paymentCancel,
  paymentComplete,
  paymentFailed,
} from "./payment.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const paymentRoutes = Router();

paymentRoutes.post("/create-payment", auth(USER_ROLE.user), createPayment);
paymentRoutes.post("/payment/success/:tranId", paymentComplete);
paymentRoutes.post("/payment/fail/:tranId", paymentFailed);
paymentRoutes.post("/payment/cancel/:tranId", paymentCancel);

export default paymentRoutes;
