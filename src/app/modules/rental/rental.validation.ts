import { z } from "zod";

const createRentalValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string({
      required_error: "startTime is required",
      
    }),
    returnTime: z.date().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
});

export { createRentalValidationSchema };
