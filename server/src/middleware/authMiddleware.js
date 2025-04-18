// server/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Authentication middleware to protect routes
 * Verifies JWT token and adds user to request object
 */
const protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and has Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id from token and exclude password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * Optional authentication middleware
 * Verifies JWT token if present but doesn't require it
 * Used for routes that can be accessed by both authenticated and anonymous users
 */
const optionalAuth = async (req, res, next) => {
  let token;

  // Check if auth header exists and has Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id from token and exclude password
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      // Don't return error, just don't set user
      console.error("Optional auth error:", error);
    }
  }

  next();
};

module.exports = { protect, optionalAuth };
