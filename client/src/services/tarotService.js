// client/src/services/tarotService.js

/**
 * Service to handle tarot card data and operations
 */

import tarotDeck from "../data/tarotDeck";

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
