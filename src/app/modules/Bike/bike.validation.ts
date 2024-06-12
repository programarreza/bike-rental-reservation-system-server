import { z } from "zod";

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "name is required" }),
    description: z.string({ invalid_type_error: "description is required" }),
    pricePerHour: z.number({ invalid_type_error: "pricePerHour is required" }),
    isAvailable: z
      .boolean({ invalid_type_error: "isAvailable is required" })
      .optional(),
    cc: z.number({ invalid_type_error: "cc is required" }),
    year: z.number({ invalid_type_error: "year is required" }),
    model: z.string({ invalid_type_error: "model is required" }),
    brand: z.string({ invalid_type_error: "brand is required" }),
  }),
});

export { createBikeValidationSchema };
