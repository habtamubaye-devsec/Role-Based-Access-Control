const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect.js');
const authRoutes = require("./routes/authRoutes.js"); 
const userRoutes = require("./routes/userRoutes.js");

// If you want auto-commit with simple-git in CommonJS:
const { runAutoCommits } = require('../autoCommit/autoCommit.js');

dbConnect();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);

// Optional: trigger auto-commit at server start
// runAutoCommits();

// Optional: API to trigger auto-commit manually
app.get("/auto-commit", async (req, res) => {
  await runAutoCommits();
  res.send("Auto commits executed and pushed to GitHub (main)");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// Auto edit at 2025-11-26T17:51:03.462Z
// Auto edit at 2025-11-26T17:51:03.869Z
// Auto edit at 2025-11-26T17:51:04.408Z
// Auto edit at 2025-11-26T17:56:35.723Z
// Auto edit at 2025-11-26T18:00:30.775Z
