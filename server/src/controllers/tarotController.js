// server/src/controllers/tarotController.js
const Card = require("../models/Card");
const Reading = require("../models/Reading");
const { generateTarotInterpretation } = require("../utils/aiService");

// Function to determine card positions based on spread type
const getPositions = (spreadType) => {
  switch (spreadType) {
    case "Single Card":
      return ["The Card"];
    case "Three Card":
      return ["Past", "Present", "Future"];
    case "Celtic Cross":
      return [
        "Present",
        "Challenge",
        "Distant Past",
        "Recent Past",
        "Potential Outcome",
        "Immediate Future",
        "Self",
        "External Influences",
        "Hopes or Fears",
        "Final Outcome",
      ];
    default:
      return ["The Card"];
  }
};

// Helper function to select random cards
const getRandomCards = (cards, count) => {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Create a new reading
exports.createReading = async (req, res) => {
  try {
    const { spreadType, question, userId } = req.body;

    // Get positions for this spread
    const positions = getPositions(spreadType);

    // Get all cards from the database
    const allCards = await Card.find();
    if (allCards.length === 0) {
      return res
        .status(404)
        .json({ message: "No cards found in the database" });
    }

    // Select random cards for the reading
    const selectedCards = getRandomCards(allCards, positions.length);

    // Create card data with positions and random orientation
    const cards = positions.map((position, index) => ({
      card: selectedCards[index]._id,
      position,
      isReversed: Math.random() > 0.7, // 30% chance of being reversed
    }));

    // Create reading document
    const readingData = {
      spreadType,
      question,
      cards,
      user: userId || null,
    };

    const newReading = new Reading(readingData);
    await newReading.save();

    // Populate card details
    await newReading.populate("cards.card");

    // Generate AI interpretation
    const aiInterpretation = await generateTarotInterpretation(newReading);

    // Update reading with AI interpretation
    newReading.aiInterpretation = aiInterpretation;
    await newReading.save();

    return res.status(201).json(newReading);
  } catch (error) {
    console.error("Error creating reading:", error);
    return res
      .status(500)
      .json({ message: "Error creating reading", error: error.message });
  }
};

// Get all readings for a user
exports.getUserReadings = async (req, res) => {
  try {
    const userId = req.user._id;

    const readings = await Reading.find({ user: userId })
      .populate("cards.card")
      .sort({ createdAt: -1 });

    return res.status(200).json(readings);
  } catch (error) {
    console.error("Error fetching user readings:", error);
    return res
      .status(500)
      .json({ message: "Error fetching readings", error: error.message });
  }
};

// Get a specific reading by ID
exports.getReadingById = async (req, res) => {
  try {
    const { id } = req.params;

    const reading = await Reading.findById(id).populate("cards.card");

    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }

    // Check if the reading belongs to the authenticated user or is public
    if (reading.user && reading.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this reading" });
    }

    return res.status(200).json(reading);
  } catch (error) {
    console.error("Error fetching reading:", error);
    return res
      .status(500)
      .json({ message: "Error fetching reading", error: error.message });
  }
};

// Delete a reading
exports.deleteReading = async (req, res) => {
  try {
    const { id } = req.params;

    const reading = await Reading.findById(id);

    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }

    // Check if the reading belongs to the authenticated user
    if (reading.user && reading.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this reading" });
    }

    await Reading.findByIdAndDelete(id);

    return res.status(200).json({ message: "Reading deleted successfully" });
  } catch (error) {
    console.error("Error deleting reading:", error);
    return res
      .status(500)
      .json({ message: "Error deleting reading", error: error.message });
  }
};
