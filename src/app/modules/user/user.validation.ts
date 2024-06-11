import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ invalid_type_error: "name is required" }),
  email: z.string({ invalid_type_error: "email is required" }),
  password: z.string({ invalid_type_error: "password is required" }),
  phone: z.string({ invalid_type_error: "phone is required" }),
  address: z.string({ invalid_type_error: "address is required" }),
  role: z.enum(["user", "admin"]),
});

export { userValidationSchema };
