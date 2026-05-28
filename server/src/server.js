import dotenv from "dotenv";
import app from "./app.js";
import connectDB, { closeDB } from "./config/db.js";

// Load environment variables early
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

/**
 * startServer
 * Connects to the database first, then starts the Express server.
 * This ensures the app does not accept requests when the DB is unavailable.
 */
const startServer = async () => {
  try {
    console.log(`Starting server in ${NODE_ENV} mode`);

    const conn = await connectDB();
    if (conn && conn.connection && conn.connection.host) {
      console.log(`Successfully connected to MongoDB host: ${conn.connection.host}`);
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`${signal} received: closing server and MongoDB connection...`);
      server.close(async () => {
        await closeDB();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();