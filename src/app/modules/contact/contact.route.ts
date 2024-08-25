import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  createContactMessage,
  getAllContactMessage,
} from "./contact.controller";
import { createContactMessageValidationSchema } from "./contact.validation";

const contactRoutes = Router();

contactRoutes.post(
  "/create-message",
  validateRequest(createContactMessageValidationSchema),
  createContactMessage
);
contactRoutes.get("/", getAllContactMessage);

export default contactRoutes;
