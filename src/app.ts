import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import bikeRoutes from "./app/modules/Bike/bike.route";
import authRoutes from "./app/modules/auth/auth.route";
import contactRoutes from "./app/modules/contact/contact.route";
import paymentRoutes from "./app/modules/payment/payment.route";
import rentalRoutes from "./app/modules/rental/rental.route";
import userRoutes from "./app/modules/user/user.route";

const app: Application = express();

// middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["https://neon-sundae-b1b78a.netlify.app", "http://localhost:5173"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://neon-sundae-b1b78a.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// application route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bike-rental-reservation-system ");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
