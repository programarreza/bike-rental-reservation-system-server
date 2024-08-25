import { z } from "zod";

export const createContactMessageValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "name is required" }),
    email: z.string({ invalid_type_error: "email is required" }),
    phone: z.string({ invalid_type_error: "phone is required" }),
    address: z.string({ invalid_type_error: "address is required" }),
    message: z.string({ invalid_type_error: "message is required" }),
  }),
});
