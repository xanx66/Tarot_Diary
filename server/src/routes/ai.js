const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { optionalAuth } = require("../middleware/authMiddleware"); // Use your existing middleware

// Allow both authenticated and guest users
router.post('/initial-reading', optionalAuth, aiController.generateInitialReading);
router.post('/chat', optionalAuth, aiController.chatWithAI);

module.exports = router;
