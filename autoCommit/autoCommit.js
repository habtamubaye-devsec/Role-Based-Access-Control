import simpleGit from "simple-git";
import fs from "fs";
import path from "path";

const projectPath = "C:/Users/habta/Desktop/Web Project/RBAC";
const git = simpleGit(projectPath);

// Files list
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

// Random file editor
function randomEdit(filePath) {
  const text = `// Auto edit at: ${new Date().toISOString()}\n`;
  fs.appendFileSync(filePath, text);
}

const commitCount = Math.floor(Math.random() * 6) + 5; // 5–10
const startDate = new Date("2024-10-05T10:00:00");

const daysRange = 10;

export async function runAutoCommits() {
  try {
    console.log("⏳ Starting auto commits...");

    for (let i = 0; i < commitCount; i++) {
      const file = files[Math.floor(Math.random() * files.length)];
      const fullPath = path.join(projectPath, file);

      if (fs.existsSync(fullPath)) {
        randomEdit(fullPath);

        const commitMessage = `Update ${path.basename(file)} — auto commit`;

        const randomDayOffset = Math.floor(Math.random() * daysRange);
        const commitDate = new Date(startDate);
        commitDate.setDate(startDate.getDate() + randomDayOffset);

        await git.add(".");
        await git.commit(commitMessage, {
          "--date": commitDate.toISOString(),
        });

        console.log(`✔ Committed: ${commitMessage} | ${commitDate}`);
      }
    }

    console.log("⬆ Pushing commits to GitHub (master branch)...");
    await git.push("origin", "master");

    console.log("🎉 Auto commits & push completed successfully!");
  } catch (err) {
    console.error("❌ Auto commit failed:", err);
  }
}
