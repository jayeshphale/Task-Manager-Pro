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

// 3. CORS Configuration - Production-ready
// Allowed origins for cross-origin requests. Use CLIENT_URL or ALLOWED_ORIGINS in env when available.
const allowedOrigins = [
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : []),
  process.env.CLIENT_URL,
  "http://localhost:5173",      // Local dev - client
  "http://127.0.0.1:5173",      // Local dev - alternative
  "https://task-manager-pro-inky.vercel.app", // Production frontend
].filter(Boolean);

// CORS Options - Must support preflight OPTIONS requests
const corsOptions = {
  origin: function (origin, callback) {
    // Log the incoming origin for debugging
    console.log("[CORS] Incoming origin:", origin || "no-origin");

    // Allow requests with no origin (mobile apps, curl requests, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Origin not allowed - log and continue without setting CORS headers
    // NOTE: we return `callback(null, false)` instead of an error so that
    // Express does not treat this as a server error (HTTP 500). A 500 would
    // cause the response to omit CORS headers entirely. Returning false lets
    // the request continue so downstream middleware can handle the response
    // (and our safety middleware can still set headers when appropriate).
    console.warn("[CORS] Rejected origin:", origin);
    return callback(null, false);
  },
  
  // CRITICAL: Allow credentials (cookies, authorization headers)
  credentials: true,
  
  // Allowed HTTP methods for preflight and actual requests
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  
  // Allowed request headers that can be sent by the client
  allowedHeaders: ["Content-Type", "Authorization"],
  
  // HTTP status code for successful OPTIONS requests
  optionsSuccessStatus: 200,
  
  // Max age for preflight cache (in seconds)
  maxAge: 3600,
};

// Apply CORS middleware to ALL routes
app.use(cors(corsOptions));

// 4. Preflight handler - MUST come after app.use(cors())
// This handles OPTIONS requests for all routes
app.options("*", cors(corsOptions));

// 4.a Safety: ensure CORS headers are present on error responses or non-cors flows.
// This middleware sets the Access-Control-* headers when the origin is allowed or
// when DEBUG_CORS is enabled. It prevents the browser from rejecting responses
// that otherwise would lack CORS headers (for example, when an error occurs).
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const debugCorsEnabled = process.env.DEBUG_CORS === "true";

  if (!origin && !debugCorsEnabled) return next();

  if (debugCorsEnabled || (origin && allowedOrigins.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", debugCorsEnabled ? "*" : origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return next();
});

// 5. Body Parser Middleware - Parse incoming JSON/form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. Cookie Parser Middleware - Parse cookies
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