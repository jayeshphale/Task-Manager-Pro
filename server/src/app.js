import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

// ========================================
// MIDDLEWARE STACK (Order is CRITICAL)
// ========================================

// 1. Security Middleware - Add secure headers
app.use(helmet());

// 2. Logging Middleware - Log HTTP requests
app.use(morgan("dev"));

// 3. CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-pro-mzkm.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

// 4. Body Parser Middleware - Parse incoming JSON/form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Cookie Parser Middleware - Parse cookies
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