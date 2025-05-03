import { describe, it, expect, vi } from "vitest";
import tarotService from "../tarotService";
import tarotDeck from "../../data/tarotDeck";

describe("Tarot Service", () => {
  it("getFullDeck returns the complete tarot deck", () => {
    const deck = tarotService.getFullDeck();
    expect(deck).toEqual(tarotDeck);
    expect(deck.length).toBe(78); // Standard tarot deck has 78 cards
  });

  it("getShuffledDeck returns a shuffled copy of the deck", () => {
    const originalDeck = tarotService.getFullDeck();
    const shuffledDeck = tarotService.getShuffledDeck();

    // Same length
    expect(shuffledDeck.length).toBe(originalDeck.length);

    // Contains the same cards (though in different order)
    originalDeck.forEach((card) => {
      expect(shuffledDeck.some((c) => c.id === card.id)).toBe(true);
    });

    // Not in the same order (this could theoretically fail, but very unlikely)
    expect(shuffledDeck).not.toEqual(originalDeck);
  });

  it("getCardById returns the correct card", () => {
    const cardId = 0; // The Fool
    const card = tarotService.getCardById(cardId);

    expect(card).not.toBeNull();
    expect(card.id).toBe(cardId);
    expect(card.name).toBe("The Fool");
  });

  it("getCardById returns null for non-existent card", () => {
    const card = tarotService.getCardById(999); // Non-existent ID
    expect(card).toBeNull();
  });

  it("getCardsByArcana returns cards of specific arcana", () => {
    const majorCards = tarotService.getCardsByArcana("major");
    const minorCards = tarotService.getCardsByArcana("minor");

    expect(majorCards.length).toBe(22); // 22 major arcana cards
    expect(minorCards.length).toBe(56); // 56 minor arcana cards

    majorCards.forEach((card) => {
      expect(card.arcana).toBe("major");
    });

    minorCards.forEach((card) => {
      expect(card.arcana).toBe("minor");
    });
  });

  it("getCardsBySuit returns cards of specific suit", () => {
    const wandsCards = tarotService.getCardsBySuit("wands");
    const cupsCards = tarotService.getCardsBySuit("cups");
    const swordsCards = tarotService.getCardsBySuit("swords");
    const pentaclesCards = tarotService.getCardsBySuit("pentacles");

    expect(wandsCards.length).toBe(14);
    expect(cupsCards.length).toBe(14);
    expect(swordsCards.length).toBe(14);
    expect(pentaclesCards.length).toBe(14);

    wandsCards.forEach((card) => expect(card.suit).toBe("wands"));
    cupsCards.forEach((card) => expect(card.suit).toBe("cups"));
    swordsCards.forEach((card) => expect(card.suit).toBe("swords"));
    pentaclesCards.forEach((card) => expect(card.suit).toBe("pentacles"));
  });

  it("drawRandomCards returns the specified number of cards", () => {
    const count = 3;
    const cards = tarotService.drawRandomCards(count);

    expect(cards.length).toBe(count);
    expect(cards[0]).toHaveProperty("id");
    expect(cards[0]).toHaveProperty("name");
  });

  it("generateReading creates a reading with the correct structure", () => {
    const cardIds = [0, 6, 12]; // The Fool, The Lovers, The Hanged Man
    const positions = ["Past", "Present", "Future"];
    const reversals = [false, true, false];

    const reading = tarotService.generateReading(cardIds, positions, reversals);

    expect(reading).toHaveProperty("cards");
    expect(reading).toHaveProperty("timestamp");
    expect(reading).toHaveProperty("overallInterpretation");

    expect(reading.cards.length).toBe(3);

    // Check if the cards have the correct positions and reversals
    expect(reading.cards[0].id).toBe(0);
    expect(reading.cards[0].position).toBe("Past");
    expect(reading.cards[0].isReversed).toBe(false);

    expect(reading.cards[1].id).toBe(6);
    expect(reading.cards[1].position).toBe("Present");
    expect(reading.cards[1].isReversed).toBe(true);

    expect(reading.cards[2].id).toBe(12);
    expect(reading.cards[2].position).toBe("Future");
    expect(reading.cards[2].isReversed).toBe(false);
  });
});
