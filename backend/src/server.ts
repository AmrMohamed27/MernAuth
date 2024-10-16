import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string";
console.log(MONGO_URI);

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
