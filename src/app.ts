import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import userRoutes from "./app/modules/auth/auth.route";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application route
app.use("/api/auth", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bike-rental-reservation-system ");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
