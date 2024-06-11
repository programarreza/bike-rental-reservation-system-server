import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application route

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bike-rental-reservation-system ");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
