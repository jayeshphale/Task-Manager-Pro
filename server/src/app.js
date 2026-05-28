import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

// Security Middleware
app.use(helmet());

// Logging Middleware
app.use(morgan("dev"));

// CORS must be applied before body parsers and routes
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://task-manager-pro-inky.vercel.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests or same-origin local calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy does not allow this origin"));
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    return allowedOrigins.has(origin)
      ? callback(null, true)
      : callback(new Error("CORS policy does not allow this origin"));
  },
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

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