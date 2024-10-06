const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middlewares/roleMiddleware");
const verifyToken = require("../middlewares/authMiddleware");


// Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
})

// Both admin and manager can access this router
router.get("/manager", verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" });
})

// All can access this router
router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: "Welcome User" });
})

module.exports = router;// Auto edit at: 2025-11-26T17:41:25.861Z
// Auto edit at 2025-11-26T17:47:29.835Z
// Auto edit at 2025-11-26T17:47:30.643Z
// Auto edit at 2025-11-26T17:51:03.062Z
