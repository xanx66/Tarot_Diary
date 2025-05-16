const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const tarotRoutes = require("./routes/tarot");
const userRoutes = require("./routes/user");
const aiRoutes = require("./routes/ai");

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/tarot", tarotRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

// Database connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
