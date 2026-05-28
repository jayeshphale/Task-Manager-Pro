import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());

// Logging Middleware
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., curl, mobile apps)
      if (!origin) return callback(null, true);

      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      const alternateOrigin = clientUrl.replace("localhost", "127.0.0.1");
      const allowedOrigins = new Set([clientUrl, alternateOrigin]);

      if (allowedOrigins.has(origin)) return callback(null, true);

      return callback(new Error("CORS policy does not allow this origin"));
    },
    credentials: true,
  })
);

// Health Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;