import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { runAutoCommits } from "../autoCommit/autoCommit.js";

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);

// OPTIONAL: Run auto commit at server start
// runAutoCommits();

// Endpoint to trigger auto commit
app.get("/auto-commit", async (req, res) => {
  await runAutoCommits();
  console.log("Auto commits executed and pushed to GitHub (master)");
  res.send("Auto commits executed and pushed to GitHub (master)");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
