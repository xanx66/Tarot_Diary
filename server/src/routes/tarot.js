// server/src/routes/tarot.js
const express = require("express");
const tarotController = require("../controllers/tarotController");
const { protect, optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new reading - can be used by authenticated or anonymous users
router.post("/readings", optionalAuth, tarotController.createReading);

// Get all readings for the authenticated user
router.get("/readings/user", protect, tarotController.getUserReadings);

// Get a specific reading by ID
router.get("/readings/:id", optionalAuth, tarotController.getReadingById);

// Delete a reading
router.delete("/readings/:id", protect, tarotController.deleteReading);

module.exports = router;
