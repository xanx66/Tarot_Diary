// server/src/routes/user.js
const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);

module.exports = router;
