const mongoose = require("mongoose");

const ReadingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Can be anonymous
  },
  spreadType: {
    type: String,
    enum: ["Three Card", "Celtic Cross", "Single Card"],
    required: true,
  },
  question: {
    type: String,
  },
  cards: [
    {
      card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      isReversed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  aiInterpretation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reading", ReadingSchema);
