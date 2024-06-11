import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application route

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bike-rental-reservation-system ");
});

export default app;
