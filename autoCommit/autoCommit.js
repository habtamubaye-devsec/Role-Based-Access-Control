const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

const projectPath = "C:/Users/habta/Desktop/Web Project/RBAC";
const git = simpleGit(projectPath);

// List of files to randomly commit
const files = [
  "package-lock.json",
  "package.json",
  "src/index.js",
  "src/config/dbConnect.js",
  "src/controllers/authController.js",
  "src/middlewares/authMiddleware.js",
  "src/middlewares/roleMiddleware.js",
  "src/models/userModel.js",
  "src/routes/authRoutes.js",
  "src/routes/userRoutes.js",
];

// Function to make a random edit in the file
function randomEdit(filePath) {
  const content = `// Auto edit at ${new Date().toISOString()}\n`;
  fs.appendFileSync(filePath, content);
}

// Random number of commits between 5–10
const commitCount = Math.floor(Math.random() * 6) + 5;

// Start date in the past (Oct 2, 2024)
const startDate = new Date("2024-10-02T10:00:00");
// Spread commits for 10 days
const daysRange = 10;

async function runAutoCommits() {
  try {
    console.log("⏳ Starting auto commits in the past...");

    for (let i = 0; i < commitCount; i++) {
      const file = files[Math.floor(Math.random() * files.length)];
      const fullPath = path.join(projectPath, file);

      if (fs.existsSync(fullPath)) {
        randomEdit(fullPath);

        const commitMessage = `Update ${path.basename(file)} — auto commit`;

        // Generate a random commit date within 10 days from startDate
        const randomDayOffset = Math.floor(Math.random() * daysRange);
        const commitDate = new Date(startDate);
        commitDate.setDate(startDate.getDate() + randomDayOffset);

        // Stage changes
        await git.add(".");
        // Commit with the past date
        await git.commit(commitMessage, {
          "--date": commitDate.toISOString(),
        });

        console.log(`✔ Committed: ${commitMessage} | ${commitDate}`);
      }
    }

    // Detect current branch automatically
    const status = await git.status();
    const currentBranch = status.current || "main"; // default to main
    console.log(`⬆ Pushing commits to GitHub (${currentBranch})...`);
    await git.push("origin", currentBranch);

    console.log("🎉 Auto commits in the past & push completed!");
  } catch (err) {
    console.error("❌ Auto commit failed:", err);
  }
}

module.exports = { runAutoCommits };
