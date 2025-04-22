// client/src/services/tarotService.js

/**
 * Service to handle tarot card data and operations
 */

// Tarot card data structure for the Rider-Waite deck
const tarotDeck = [
  // Major Arcana (22 cards)
  {
    id: 0,
    name: "The Fool",
    arcana: "major",
    suit: null,
    number: 0,
    img: "/cards/major/fool.jpg",
    meanings: {
      upright: ["New beginnings", "Adventure", "Spontaneity", "Optimism"],
      reversed: [
        "Recklessness",
        "Fear of the unknown",
        "Poor choices",
        "Indecision",
      ],
    },
    description:
      "The Fool represents new beginnings, having faith in the future, innocence, and spontaneity.",
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "major",
    suit: null,
    number: 1,
    img: "/cards/major/magician.jpg",
    meanings: {
      upright: ["Manifestation", "Power", "Action", "Inspired creation"],
      reversed: [
        "Manipulation",
        "Poor planning",
        "Untapped talents",
        "Illusion",
      ],
    },
    description:
      "The Magician represents manifestation of desires, inspired action, and connecting with one's higher purpose.",
  },
  // ... Add more Major Arcana cards

  // Minor Arcana - Wands (14 cards)
  {
    id: 22,
    name: "Ace of Wands",
    arcana: "minor",
    suit: "wands",
    number: 1,
    img: "/cards/wands/ace.jpg",
    meanings: {
      upright: ["Creation", "Willpower", "Inspiration", "Desire"],
      reversed: ["Lack of energy", "Lack of passion", "Boredom", "Delays"],
    },
    description:
      "The Ace of Wands represents creation, new energy, passion, and enthusiasm.",
  },
  // ... Add more Wands cards

  // Minor Arcana - Cups (14 cards)
  {
    id: 36,
    name: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    number: 1,
    img: "/cards/cups/ace.jpg",
    meanings: {
      upright: ["New feelings", "Emotional awakening", "Love", "Compassion"],
      reversed: [
        "Emotional loss",
        "Blocked emotions",
        "Emptiness",
        "Repressed feelings",
      ],
    },
    description:
      "The Ace of Cups represents emotional beginnings, new relationships, and spiritual connection.",
  },
  // ... Add more Cups cards

  // Minor Arcana - Swords (14 cards)
  {
    id: 50,
    name: "Ace of Swords",
    arcana: "minor",
    suit: "swords",
    number: 1,
    img: "/cards/swords/ace.jpg",
    meanings: {
      upright: ["Mental clarity", "Breakthrough", "New idea", "Truth"],
      reversed: ["Confusion", "Chaos", "Lack of clarity", "Misunderstanding"],
    },
    description:
      "The Ace of Swords represents mental clarity, new insights, and the truth cutting through confusion.",
  },
  // ... Add more Swords cards

  // Minor Arcana - Pentacles (14 cards)
  {
    id: 64,
    name: "Ace of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 1,
    img: "/cards/pentacles/ace.jpg",
    meanings: {
      upright: [
        "New financial opportunity",
        "Abundance",
        "Prosperity",
        "Security",
      ],
      reversed: [
        "Missed opportunity",
        "Scarcity mindset",
        "Financial issues",
        "Insecurity",
      ],
    },
    description:
      "The Ace of Pentacles represents new material beginnings, prosperity, and foundations.",
  },
  // ... Add more Pentacles cards
];

/**
 * Get the full tarot deck
 * @returns {Array} The complete tarot deck
 */
export const getFullDeck = () => {
  return tarotDeck;
};

/**
 * Shuffle the tarot deck
 * @returns {Array} A shuffled copy of the tarot deck
 */
export const getShuffledDeck = () => {
  return [...tarotDeck].sort(() => Math.random() - 0.5);
};

/**
 * Get a card by ID
 * @param {number} id The card ID to find
 * @returns {Object|null} The card object or null if not found
 */
export const getCardById = (id) => {
  return tarotDeck.find((card) => card.id === id) || null;
};

/**
 * Get cards by arcana type
 * @param {string} arcana The arcana type ('major' or 'minor')
 * @returns {Array} Cards matching the arcana type
 */
export const getCardsByArcana = (arcana) => {
  return tarotDeck.filter((card) => card.arcana === arcana);
};

/**
 * Get cards by suit
 * @param {string} suit The suit name ('wands', 'cups', 'swords', 'pentacles', or null for Major Arcana)
 * @returns {Array} Cards matching the suit
 */
export const getCardsBySuit = (suit) => {
  return tarotDeck.filter((card) => card.suit === suit);
};

/**
 * Draw a random selection of cards
 * @param {number} count The number of cards to draw
 * @returns {Array} The randomly selected cards
 */
export const drawRandomCards = (count = 1) => {
  const shuffled = getShuffledDeck();
  return shuffled.slice(0, count);
};

/**
 * Generate a complete card reading with interpretations
 * @param {Array} cardIds Array of card IDs in the reading
 * @param {Array} positions Array of position names for each card
 * @param {Array} reversals Array of booleans indicating if cards are reversed
 * @returns {Object} Complete reading with cards and interpretations
 */
export const generateReading = (cardIds, positions, reversals) => {
  // Map each card ID to its full data and add position and reversal info
  const cards = cardIds.map((id, index) => {
    const card = getCardById(id);
    const isReversed = reversals[index] || false;
    const position = positions[index] || `Card ${index + 1}`;

    return {
      ...card,
      position,
      isReversed,
      interpretation: isReversed
        ? `${position}: ${card.name} (Reversed) - ${card.meanings.reversed.join(
            ", "
          )}`
        : `${position}: ${card.name} - ${card.meanings.upright.join(", ")}`,
    };
  });

  // Create the full reading object
  return {
    cards,
    timestamp: new Date().toISOString(),
    overallInterpretation: generateOverallInterpretation(cards),
  };
};

/**
 * Generate an overall interpretation of the reading (placeholder for AI integration)
 * @param {Array} cards The cards in the reading with their positions and orientations
 * @returns {string} An overall interpretation of the reading
 */
const generateOverallInterpretation = (cards) => {
  // This is a placeholder. In a real app, you might:
  // 1. Use an AI service like OpenAI to generate an interpretation
  // 2. Have pre-written interpretations for common card combinations
  // 3. Use a more sophisticated algorithm to generate meaningful connections

  return `This reading suggests a journey involving ${cards
    .map((card) =>
      card.isReversed
        ? `challenges related to ${card.name}`
        : `the energy of ${card.name}`
    )
    .join(", ")}. Consider how these energies interact in your situation.`;
};

export default {
  getFullDeck,
  getShuffledDeck,
  getCardById,
  getCardsByArcana,
  getCardsBySuit,
  drawRandomCards,
  generateReading,
};
