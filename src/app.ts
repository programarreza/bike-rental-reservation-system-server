import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import authRoutes from "./app/modules/auth/auth.route";
import userRoutes from "./app/modules/user/user.route";
import bikeRoutes from "./app/modules/Bike/bike.route";
import rentalRoutes from "./app/modules/rental/rental.route";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/rentals", rentalRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bike-rental-reservation-system ");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
