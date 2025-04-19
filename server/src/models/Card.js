const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  suit: {
    type: String,
    enum: ["Major Arcana", "Wands", "Cups", "Swords", "Pentacles"],
    required: true,
  },
  number: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  upright: {
    type: String,
    required: true,
  },
  reversed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Card", CardSchema);
