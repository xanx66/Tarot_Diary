// server/src/utils/seedData.js
// This file contains seed data for tarot cards that you can use to populate your database

const majorArcana = [
  {
    name: "The Fool",
    suit: "Major Arcana",
    number: 0,
    image: "/images/cards/major/fool.jpg",
    upright: "New beginnings, innocence, spontaneity, free spirit",
    reversed: "Recklessness, risk-taking, inconsideration",
    description:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
  },
  {
    name: "The Magician",
    suit: "Major Arcana",
    number: 1,
    image: "/images/cards/major/magician.jpg",
    upright: "Manifestation, resourcefulness, power, inspired action",
    reversed: "Manipulation, poor planning, untapped talents",
    description:
      "The Magician represents tapping into one's full potential, manifesting desires through focused intent, and having the necessary skill and tools to accomplish goals.",
  },
  {
    name: "The High Priestess",
    suit: "Major Arcana",
    number: 2,
    image: "/images/cards/major/highpriestess.jpg",
    upright: "Intuition, sacred knowledge, divine feminine, subconscious mind",
    reversed: "Secrets, disconnected from intuition, withdrawal",
    description:
      "The High Priestess represents intuition, mystery, spiritual awareness and deep understanding beyond logic or intellect.",
  },
  // Add more major arcana cards...
];

const wands = [
  {
    name: "Ace of Wands",
    suit: "Wands",
    number: 1,
    image: "/images/cards/wands/ace.jpg",
    upright: "Inspiration, creative spark, new initiative, enthusiasm",
    reversed: "Delays, lack of motivation, creative blocks",
    description:
      "The Ace of Wands represents the initial spark of a new idea, creative inspiration, or the beginning of an exciting venture.",
  },
  {
    name: "Two of Wands",
    suit: "Wands",
    number: 2,
    image: "/images/cards/wands/two.jpg",
    upright: "Planning, making decisions, leaving comfort zone",
    reversed: "Fear of change, lack of planning, bad decisions",
    description:
      "The Two of Wands represents making plans for the future, making decisions with confidence, and stepping outside your comfort zone.",
  },
  // Add more wands cards...
];

const cups = [
  {
    name: "Ace of Cups",
    suit: "Cups",
    number: 1,
    image: "/images/cards/cups/ace.jpg",
    upright: "New feelings, intuition, intimacy, love, emotional fulfillment",
    reversed: "Emotional loss, blocked creativity, emptiness",
    description:
      "The Ace of Cups represents new emotional beginnings, the start of a new relationship, spiritual awakening, or creative inspiration.",
  },
  {
    name: "Two of Cups",
    suit: "Cups",
    number: 2,
    image: "/images/cards/cups/two.jpg",
    upright: "Unity, partnership, mutual attraction, connection",
    reversed: "Imbalanced relationship, tension, disconnection",
    description:
      "The Two of Cups represents partnerships, love, and the connection between individuals, whether romantic, platonic, or business.",
  },
  // Add more cups cards...
];

const swords = [
  {
    name: "Ace of Swords",
    suit: "Swords",
    number: 1,
    image: "/images/cards/swords/ace.jpg",
    upright: "Clarity, breakthrough, new idea, concentration",
    reversed: "Confusion, chaos, mental fog, overwhelm",
    description:
      "The Ace of Swords represents mental clarity, breakthrough insights, and the cutting through of confusion to reveal truth.",
  },
  {
    name: "Two of Swords",
    suit: "Swords",
    number: 2,
    image: "/images/cards/swords/two.jpg",
    upright: "Difficult choices, stalemate, balance, indecision",
    reversed: "Confusion, indecision, information overload",
    description:
      "The Two of Swords represents difficult decisions, a stalemate, denial, or being stuck between a rock and a hard place.",
  },
  // Add more swords cards...
];

const pentacles = [
  {
    name: "Ace of Pentacles",
    suit: "Pentacles",
    number: 1,
    image: "/images/cards/pentacles/ace.jpg",
    upright: "New financial opportunity, manifestation, abundance",
    reversed: "Missed opportunity, lack of planning, scarcity",
    description:
      "The Ace of Pentacles represents new material beginnings, prosperity, and the seed of something that has practical or financial potential.",
  },
  {
    name: "Two of Pentacles",
    suit: "Pentacles",
    number: 2,
    image: "/images/cards/pentacles/two.jpg",
    upright: "Balance, adaptability, juggling priorities",
    reversed: "Imbalance, disorganization, overwhelm",
    description:
      "The Two of Pentacles represents juggling resources, balancing priorities, and adapting to change in a pragmatic way.",
  },
  // Add more pentacles cards...
];

// Export all cards
module.exports = [...majorArcana, ...wands, ...cups, ...swords, ...pentacles];
