import mongoose from "mongoose";

/**
 * connectDB
 * Establishes a connection to MongoDB using MONGO_URI from environment variables.
 * Exits the process when a fatal connection error occurs to avoid running with a broken DB state.
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "";

  if (!mongoUri) {
    console.error("MONGO_URI is not defined. Please set MONGO_URI in your .env file");
    process.exit(1);
  }

  try {
    // Mongoose v6+ sets sensible defaults; additional options may be added if required.
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connection event handlers for improved observability
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. The application will attempt to reconnect.");
    });

    return conn;
  } catch (error) {
    console.error("Database Connection Error:", error);
    // Exit: starting the app without DB is unsafe
    process.exit(1);
  }
};

/**
 * closeDB
 * Gracefully closes the mongoose connection.
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  }
};

export { connectDB, closeDB };
export default connectDB;