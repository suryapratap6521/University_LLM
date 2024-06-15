import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import { addDummyAdmin } from "./controller/adminController.js";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/hackathon")
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log("MongoDB connected successfully");
  });
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

const PORT = process.env.PORT || 5001;
