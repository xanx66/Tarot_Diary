// server/src/utils/seedDatabase.js
const mongoose = require("mongoose");
const Card = require("../models/Card");
const cards = require("./seedData");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await Card.deleteMany({});
    console.log("Cleared existing card data");

    // Insert seed data
    const createdCards = await Card.insertMany(cards);
    console.log(`Inserted ${createdCards.length} cards into the database`);

    // Create placeholder images directory structure reminder
    console.log(
      "\nIMPORTANT: Remember to create the following directory structure for card images:"
    );
    console.log("client/public/images/cards/");
    console.log("├── cups");
    console.log("├── major");
    console.log("├── pentacles");
    console.log("├── swords");
    console.log("└── wands");

    console.log(
      '\nEach directory should contain images named according to the card data, e.g., "ace.jpg", "fool.jpg", etc.'
    );

    // Close connection
    mongoose.connection.close();
    console.log("Database connection closed");

    return {
      success: true,
      message: `Inserted ${createdCards.length} cards into the database`,
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, message: error.message };
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Fatal error during seeding:", error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
