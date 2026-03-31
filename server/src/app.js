import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || "*",
    credentials: false,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "SK Pro Beauty Hub API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
