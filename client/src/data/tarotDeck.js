// Tarot card data structure for the Rider-Waite deck (78 cards total)
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
  {
    id: 2,
    name: "The High Priestess",
    arcana: "major",
    suit: null,
    number: 2,
    img: "/cards/major/high_priestess.jpg",
    meanings: {
      upright: [
        "Intuition",
        "Unconscious knowledge",
        "Mystery",
        "Spiritual insight",
      ],
      reversed: [
        "Secrets",
        "Disconnection from intuition",
        "Repressed feelings",
        "Withdrawal",
      ],
    },
    description:
      "The High Priestess represents intuition, the subconscious mind, and the mysteries of life.",
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "major",
    suit: null,
    number: 3,
    img: "/cards/major/empress.jpg",
    meanings: {
      upright: ["Fertility", "Abundance", "Nurturing", "Creativity"],
      reversed: ["Dependence", "Smothering", "Lack of growth", "Neglect"],
    },
    description:
      "The Empress represents fertility, motherhood, and the nurturing aspects of life.",
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "major",
    suit: null,
    number: 4,
    img: "/cards/major/emperor.jpg",
    meanings: {
      upright: ["Authority", "Structure", "Control", "Father figure"],
      reversed: [
        "Domination",
        "Irrationality",
        "Lack of discipline",
        "Inflexibility",
      ],
    },
    description:
      "The Emperor represents authority, structure, and the power of leadership.",
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "major",
    suit: null,
    number: 5,
    img: "/cards/major/hierophant.jpg",
    meanings: {
      upright: ["Tradition", "Conformity", "Spiritual wisdom", "Education"],
      reversed: [
        "Rebellion",
        "Unconventionality",
        "New approaches",
        "Challenge to authority",
      ],
    },
    description:
      "The Hierophant represents tradition, spiritual guidance, and the importance of education.",
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "major",
    suit: null,
    number: 6,
    img: "/cards/major/lovers.jpg",
    meanings: {
      upright: ["Love", "Union", "Partnership", "Choices"],
      reversed: ["Disharmony", "Imbalance", "Miscommunication", "Conflict"],
    },
    description:
      "The Lovers represents love, harmony, and the importance of choices in relationships.",
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "major",
    suit: null,
    number: 7,
    img: "/cards/major/chariot.jpg",
    meanings: {
      upright: ["Control", "Willpower", "Victory", "Determination"],
      reversed: ["Lack of control", "Aggression", "Defeat", "Obstacles"],
    },
    description:
      "The Chariot represents control, willpower, and the ability to overcome obstacles.",
  },
  {
    id: 8,
    name: "Strength",
    arcana: "major",
    suit: null,
    number: 8,
    img: "/cards/major/strength.jpg",
    meanings: {
      upright: ["Courage", "Bravery", "Compassion", "Inner strength"],
      reversed: ["Self-doubt", "Weakness", "Lack of confidence", "Insecurity"],
    },
    description:
      "Strength represents courage, compassion, and the inner strength to overcome challenges.",
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "major",
    suit: null,
    number: 9,
    img: "/cards/major/hermit.jpg",
    meanings: {
      upright: [
        "Soul-searching",
        "Introspection",
        "Inner guidance",
        "Solitude",
      ],
      reversed: [
        "Isolation",
        "Loneliness",
        "Withdrawal",
        "Fear of being alone",
      ],
    },
    description:
      "The Hermit represents soul-searching, introspection, and the quest for inner guidance.",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "major",
    suit: null,
    number: 10,
    img: "/cards/major/wheel_of_fortune.jpg",
    meanings: {
      upright: ["Luck", "Karma", "Life cycles", "Destiny"],
      reversed: [
        "Bad luck",
        "Negative external forces",
        "Resistance to change",
        "Stagnation",
      ],
    },
    description:
      "The Wheel of Fortune represents the cycles of life, luck, and the influence of fate.",
  },
  {
    id: 11,
    name: "Justice",
    arcana: "major",
    suit: null,
    number: 11,
    img: "/cards/major/justice.jpg",
    meanings: {
      upright: ["Fairness", "Truth", "Law", "Cause and effect"],
      reversed: [
        "Dishonesty",
        "Unfair treatment",
        "Lack of accountability",
        "Bias",
      ],
    },
    description:
      "Justice represents fairness, truth, and the importance of accountability in actions.",
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "major",
    suit: null,
    number: 12,
    img: "/cards/major/the_hanged_man.jpg",
    meanings: {
      upright: ["Sacrifice", "Letting go", "New perspectives", "Patience"],
      reversed: [
        "Stalling",
        "Resistance to change",
        "Indecision",
        "Self-sacrifice",
      ],
    },
    description:
      "The hanged man represents sacrifice, letting go, and the importance of new perspectives.",
  },
  {
    id: 13,
    name: "Death",
    arcana: "major",
    suit: null,
    number: 13,
    img: "/cards/major/death.jpg",
    meanings: {
      upright: ["Endings", "Transformation", "Transition", "Change"],
      reversed: [
        "Fear of change",
        "Stagnation",
        "Resistance to transformation",
        "Holding on",
      ],
    },
    description:
      "Death represents endings, transformation, and the importance of embracing change.",
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "major",
    suit: null,
    number: 14,
    img: "/cards/major/temperance.jpg",
    meanings: {
      upright: ["Balance", "Moderation", "Patience", "Purpose"],
      reversed: ["Imbalance", "Excess", "Lack of harmony", "Disharmony"],
    },
    description:
      "Temperance represents balance, moderation, and the importance of finding harmony in life.",
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "major",
    suit: null,
    number: 15,
    img: "/cards/major/devil.jpg",
    meanings: {
      upright: ["Addiction", "Materialism", "Playfulness", "Shadow self"],
      reversed: ["Freedom", "Release", "Reclaiming power", "Detachment"],
    },
    description:
      "The Devil represents addiction, materialism, and the importance of confronting one's shadow self.",
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "major",
    suit: null,
    number: 16,
    img: "/cards/major/tower.jpg",
    meanings: {
      upright: ["Sudden change", "Chaos", "Revelation", "Awakening"],
      reversed: [
        "Avoidance of disaster",
        "Fear of change",
        "Delayed disaster",
        "Fear of the unknown",
      ],
    },
    description:
      "The Tower represents sudden change, chaos, and the importance of awakening to new truths.",
  },
  {
    id: 17,
    name: "The Star",
    arcana: "major",
    suit: null,
    number: 17,
    img: "/cards/major/star.jpg",
    meanings: {
      upright: ["Hope", "Faith", "Purpose", "Renewal"],
      reversed: [
        "Lack of faith",
        "Despair",
        "Disconnection",
        "Self-trust issues",
      ],
    },
    description:
      "The Star represents hope, faith, and the importance of renewal and inspiration.",
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "major",
    suit: null,
    number: 18,
    img: "/cards/major/moon.jpg",
    meanings: {
      upright: ["Illusion", "Fear", "Anxiety", "Subconscious"],
      reversed: [
        "Release of fear",
        "Repressed emotions",
        "Inner confusion",
        "Misinterpretation",
      ],
    },
    description:
      "The Moon represents illusion, fear, and the importance of exploring the subconscious mind.",
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "major",
    suit: null,
    number: 19,
    img: "/cards/major/sun.jpg",
    meanings: {
      upright: ["Joy", "Success", "Celebration", "Positivity"],
      reversed: [
        "Temporary depression",
        "Lack of success",
        "Burnout",
        "Excessive optimism",
      ],
    },
    description:
      "The Sun represents joy, success, and the importance of positivity and celebration.",
  },
  {
    id: 20,
    name: "Judgment",
    arcana: "major",
    suit: null,
    number: 20,
    img: "/cards/major/judgment.jpg",
    meanings: {
      upright: ["Judgment", "Rebirth", "Inner calling", "Reflection"],
      reversed: [
        "Self-doubt",
        "Inner critic",
        "Fear of change",
        "Avoidance of responsibility",
      ],
    },
    description:
      "Judgment represents judgment, rebirth, and the importance of reflection and inner calling.",
  },
  {
    id: 21,
    name: "The World",
    arcana: "major",
    suit: null,
    number: 21,
    img: "/cards/major/world.jpg",
    meanings: {
      upright: ["Completion", "Integration", "Achievement", "Travel"],
      reversed: [
        "Incompletion",
        "Lack of closure",
        "Stagnation",
        "Unfinished business",
      ],
    },
    description:
      "The World represents completion, integration, and the importance of achievement and travel.",
  },
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
  {
    id: 23,
    name: "Two of Wands",
    arcana: "minor",
    suit: "wands",
    number: 2,
    img: "/cards/wands/two.jpg",
    meanings: {
      upright: ["Planning", "Future planning", "Decisions", "Discovery"],
      reversed: [
        "Fear of unknown",
        "Lack of planning",
        "Indecision",
        "Avoidance of decisions",
      ],
    },
    description:
      "The Two of Wands represents planning, future possibilities, and the importance of decisions.",
  },
  {
    id: 24,
    name: "Three of Wands",
    arcana: "minor",
    suit: "wands",
    number: 3,
    img: "/cards/wands/three.jpg",
    meanings: {
      upright: ["Expansion", "Growth", "Long-term vision", "Exploration"],
      reversed: [
        "Lack of foresight",
        "Short-term thinking",
        "Obstacles to growth",
        "Delays in progress",
      ],
    },
    description:
      "The Three of Wands represents expansion, growth, and the importance of long-term vision.",
  },
  {
    id: 25,
    name: "Four of Wands",
    arcana: "minor",
    suit: "wands",
    number: 4,
    img: "/cards/wands/four.jpg",
    meanings: {
      upright: ["Celebration", "Harmony", "Homecoming", "Community"],
      reversed: ["Conflict", "Disruption", "Lack of support", "Instability"],
    },
    description:
      "The Four of Wands represents celebration, harmony, and the importance of community.",
  },
  {
    id: 26,
    name: "Five of Wands",
    arcana: "minor",
    suit: "wands",
    number: 5,
    img: "/cards/wands/five.jpg",
    meanings: {
      upright: ["Conflict", "Competition", "Struggle", "Challenge"],
      reversed: [
        "Avoidance of conflict",
        "Compromise",
        "Resolution",
        "Harmony",
      ],
    },
    description:
      "The Five of Wands represents conflict, competition, and the importance of overcoming challenges.",
  },
  {
    id: 27,
    name: "Six of Wands",
    arcana: "minor",
    suit: "wands",
    number: 6,
    img: "/cards/wands/six.jpg",
    meanings: {
      upright: ["Victory", "Success", "Public recognition", "Self-confidence"],
      reversed: [
        "Lack of recognition",
        "Egoism",
        "Failure",
        "Lack of confidence",
      ],
    },
    description:
      "The Six of Wands represents victory, success, and the importance of public recognition.",
  },
  {
    id: 28,
    name: "Seven of Wands",
    arcana: "minor",
    suit: "wands",
    number: 7,
    img: "/cards/wands/seven.jpg",
    meanings: {
      upright: ["Challenge", "Protection", "Perseverance", "Defiance"],
      reversed: [
        "Giving up",
        "Overwhelmed",
        "Defensiveness",
        "Lack of confidence",
      ],
    },
    description:
      "The Seven of Wands represents challenge, protection, and the importance of perseverance.",
  },
  {
    id: 29,
    name: "Eight of Wands",
    arcana: "minor",
    suit: "wands",
    number: 8,
    img: "/cards/wands/eight.jpg",
    meanings: {
      upright: ["Speed", "Action", "Quick decisions", "Movement"],
      reversed: ["Delays", "Stagnation", "Lack of progress", "Frustration"],
    },
    description:
      "The Eight of Wands represents speed, action, and the importance of quick decisions.",
  },
  {
    id: 30,
    name: "Nine of Wands",
    arcana: "minor",
    suit: "wands",
    number: 9,
    img: "/cards/wands/nine.jpg",
    meanings: {
      upright: ["Resilience", "Courage", "Persistence", "Boundaries"],
      reversed: ["Defensiveness", "Paranoia", "Insecurity", "Fear of failure"],
    },
    description:
      "The Nine of Wands represents resilience, courage, and the importance of persistence.",
  },
  {
    id: 31,
    name: "Ten of Wands",
    arcana: "minor",
    suit: "wands",
    number: 10,
    img: "/cards/wands/ten.jpg",
    meanings: {
      upright: ["Burden", "Responsibility", "Hard work", "Stress"],
      reversed: ["Burnout", "Delegation", "Release of burdens", "Overwhelm"],
    },
    description:
      "The Ten of Wands represents burden, responsibility, and the importance of hard work.",
  },
  {
    id: 32,
    name: "Page of Wands",
    arcana: "minor",
    suit: "wands",
    number: 11,
    img: "/cards/wands/page.jpg",
    meanings: {
      upright: ["Inspiration", "Enthusiasm", "Creativity", "Exploration"],
      reversed: [
        "Lack of direction",
        "Doubt",
        "Fear of failure",
        "Lack of ambition",
      ],
    },
    description:
      "The Page of Wands represents inspiration, enthusiasm, and the importance of creativity.",
  },
  {
    id: 33,
    name: "Knight of Wands",
    arcana: "minor",
    suit: "wands",
    number: 12,
    img: "/cards/wands/knight.jpg",
    meanings: {
      upright: ["Energy", "Passion", "Adventure", "Action"],
      reversed: ["Haste", "Impulsiveness", "Recklessness", "Lack of direction"],
    },
    description:
      "The Knight of Wands represents energy, passion, and the importance of adventure.",
  },
  {
    id: 34,
    name: "Queen of Wands",
    arcana: "minor",
    suit: "wands",
    number: 13,
    img: "/cards/wands/queen.jpg",
    meanings: {
      upright: ["Confidence", "Independence", "Social butterfly", "Creativity"],
      reversed: ["Self-doubt", "Lack of confidence", "Jealousy", "Insecurity"],
    },
    description:
      "The Queen of Wands represents confidence, independence, and the importance of creativity.",
  },
  {
    id: 35,
    name: "King of Wands",
    arcana: "minor",
    suit: "wands",
    number: 14,
    img: "/cards/wands/king.jpg",
    meanings: {
      upright: ["Leadership", "Vision", "Entrepreneurship", "Charisma"],
      reversed: [
        "Impulsiveness",
        "Overbearing",
        "Lack of direction",
        "Arrogance",
      ],
    },
    description:
      "The King of Wands represents leadership, vision, and the importance of charisma.",
  },
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
  {
    id: 37,
    name: "Two of Cups",
    arcana: "minor",
    suit: "cups",
    number: 2,
    img: "/cards/cups/two.jpg",
    meanings: {
      upright: ["Partnership", "Unity", "Love", "Mutual attraction"],
      reversed: ["Breakup", "Disharmony", "Imbalance", "Miscommunication"],
    },
    description:
      "The Two of Cups represents partnership, unity, and the importance of love and mutual attraction.",
  },
  {
    id: 38,
    name: "Three of Cups",
    arcana: "minor",
    suit: "cups",
    number: 3,
    img: "/cards/cups/three.jpg",
    meanings: {
      upright: ["Celebration", "Friendship", "Community", "Joy"],
      reversed: [
        "Overindulgence",
        "Isolation",
        "Lack of support",
        "Disconnection",
      ],
    },
    description:
      "The Three of Cups represents celebration, friendship, and the importance of community.",
  },
  {
    id: 39,
    name: "Four of Cups",
    arcana: "minor",
    suit: "cups",
    number: 4,
    img: "/cards/cups/four.jpg",
    meanings: {
      upright: ["Apathy", "Re-evaluation", "Contemplation", "Discontent"],
      reversed: [
        "New outlook",
        "Awareness",
        "Acceptance",
        "Emotional stability",
      ],
    },
    description:
      "The Four of Cups represents apathy, contemplation, and the importance of re-evaluation.",
  },
  {
    id: 40,
    name: "Five of Cups",
    arcana: "minor",
    suit: "cups",
    number: 5,
    img: "/cards/cups/five.jpg",
    meanings: {
      upright: ["Loss", "Grief", "Regret", "Disappointment"],
      reversed: ["Acceptance", "Moving on", "Forgiveness", "Emotional healing"],
    },
    description:
      "The Five of Cups represents loss, grief, and the importance of acceptance and moving on.",
  },
  {
    id: 41,
    name: "Six of Cups",
    arcana: "minor",
    suit: "cups",
    number: 6,
    img: "/cards/cups/six.jpg",
    meanings: {
      upright: ["Nostalgia", "Childhood memories", "Revisiting the past"],
      reversed: [
        "Stuck in the past",
        "Naivety",
        "Childishness",
        "Lack of growth",
      ],
    },
    description:
      "The Six of Cups represents nostalgia, childhood memories, and the importance of revisiting the past.",
  },
  {
    id: 42,
    name: "Seven of Cups",
    arcana: "minor",
    suit: "cups",
    number: 7,
    img: "/cards/cups/seven.jpg",
    meanings: {
      upright: ["Choices", "Opportunities", "Illusion", "Daydreaming"],
      reversed: ["Lack of choices", "Confusion", "Overwhelm", "Indecision"],
    },
    description:
      "The Seven of Cups represents choices, opportunities, and the importance of making decisions.",
  },
  {
    id: 43,
    name: "Eight of Cups",
    arcana: "minor",
    suit: "cups",
    number: 8,
    img: "/cards/cups/eight.jpg",
    meanings: {
      upright: ["Abandonment", "Withdrawal", "Seeking deeper meaning"],
      reversed: [
        "Fear of change",
        "Stagnation",
        "Avoidance of emotions",
        "Lack of direction",
      ],
    },
    description:
      "The Eight of Cups represents abandonment, withdrawal, and the importance of seeking deeper meaning.",
  },
  {
    id: 44,
    name: "Nine of Cups",
    arcana: "minor",
    suit: "cups",
    number: 9,
    img: "/cards/cups/nine.jpg",
    meanings: {
      upright: ["Contentment", "Satisfaction", "Emotional stability"],
      reversed: [
        "Dissatisfaction",
        "Lack of fulfillment",
        "Overindulgence",
        "Unrealistic expectations",
      ],
    },
    description:
      "The Nine of Cups represents contentment, satisfaction, and the importance of emotional stability.",
  },
  {
    id: 45,
    name: "Ten of Cups",
    arcana: "minor",
    suit: "cups",
    number: 10,
    img: "/cards/cups/ten.jpg",
    meanings: {
      upright: ["Happiness", "Harmony", "Family", "Emotional fulfillment"],
      reversed: [
        "Broken family",
        "Disconnection",
        "Lack of harmony",
        "Unhappiness",
      ],
    },
    description:
      "The Ten of Cups represents happiness, harmony, and the importance of family and emotional fulfillment.",
  },
  {
    id: 46,
    name: "Page of Cups",
    arcana: "minor",
    suit: "cups",
    number: 11,
    img: "/cards/cups/page.jpg",
    meanings: {
      upright: ["Creativity", "Intuition", "Inspiration", "New love"],
      reversed: [
        "Emotional immaturity",
        "Creative block",
        "Lack of imagination",
        "Disconnection from emotions",
      ],
    },
    description:
      "The Page of Cups represents creativity, intuition, and the importance of new love and inspiration.",
  },
  {
    id: 47,
    name: "Knight of Cups",
    arcana: "minor",
    suit: "cups",
    number: 12,
    img: "/cards/cups/knight.jpg",
    meanings: {
      upright: ["Romance", "Charm", "Idealism", "Imagination"],
      reversed: [
        "Unrealistic expectations",
        "Moodiness",
        "Lack of direction",
        "Disconnection from emotions",
      ],
    },
    description:
      "The Knight of Cups represents romance, charm, and the importance of idealism and imagination.",
  },
  {
    id: 48,
    name: "Queen of Cups",
    arcana: "minor",
    suit: "cups",
    number: 13,
    img: "/cards/cups/queen.jpg",
    meanings: {
      upright: ["Compassion", "Intuition", "Emotional security", "Nurturing"],
      reversed: [
        "Emotional insecurity",
        "Overly sensitive",
        "Lack of self-care",
        "Disconnection from emotions",
      ],
    },
    description:
      "The Queen of Cups represents compassion, intuition, and the importance of emotional security and nurturing.",
  },
  {
    id: 49,
    name: "King of Cups",
    arcana: "minor",
    suit: "cups",
    number: 14,
    img: "/cards/cups/king.jpg",
    meanings: {
      upright: ["Emotional balance", "Compassion", "Diplomacy", "Control"],
      reversed: [
        "Emotional manipulation",
        "Moodiness",
        "Lack of control",
        "Disconnection from emotions",
      ],
    },
    description:
      "The King of Cups represents emotional balance, compassion, and the importance of diplomacy and control.",
  },
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
  {
    id: 51,
    name: "Two of Swords",
    arcana: "minor",
    suit: "swords",
    number: 2,
    img: "/cards/swords/two.jpg",
    meanings: {
      upright: ["Indecision", "Choices", "Blocked emotions", "Stalemate"],
      reversed: [
        "Overthinking",
        "Confusion",
        "Lack of clarity",
        "Avoidance of decisions",
      ],
    },
    description:
      "The Two of Swords represents indecision, choices, and the importance of confronting blocked emotions.",
  },
  {
    id: 52,
    name: "Three of Swords",
    arcana: "minor",
    suit: "swords",
    number: 3,
    img: "/cards/swords/three.jpg",
    meanings: {
      upright: ["Heartbreak", "Emotional pain", "Grief", "Separation"],
      reversed: ["Healing", "Recovery", "Forgiveness", "Moving on"],
    },
    description:
      "The Three of Swords represents heartbreak, emotional pain, and the importance of healing and recovery.",
  },
  {
    id: 53,
    name: "Four of Swords",
    arcana: "minor",
    suit: "swords",
    number: 4,
    img: "/cards/swords/four.jpg",
    meanings: {
      upright: ["Rest", "Recovery", "Contemplation", "Reflection"],
      reversed: [
        "Burnout",
        "Restlessness",
        "Lack of recovery",
        "Avoidance of reflection",
      ],
    },
    description:
      "The Four of Swords represents rest, recovery, and the importance of contemplation and reflection.",
  },
  {
    id: 54,
    name: "Five of Swords",
    arcana: "minor",
    suit: "swords",
    number: 5,
    img: "/cards/swords/five.jpg",
    meanings: {
      upright: ["Conflict", "Defeat", "Winning at all costs", "Betrayal"],
      reversed: [
        "Resolution",
        "Compromise",
        "Moving on from conflict",
        "Avoidance of confrontation",
      ],
    },
    description:
      "The Five of Swords represents conflict, defeat, and the importance of resolution and compromise.",
  },
  {
    id: 55,
    name: "Six of Swords",
    arcana: "minor",
    suit: "swords",
    number: 6,
    img: "/cards/swords/six.jpg",
    meanings: {
      upright: ["Transition", "Change", "Moving on", "Travel"],
      reversed: [
        "Resistance to change",
        "Stagnation",
        "Avoidance of transition",
        "Fear of moving on",
      ],
    },
    description:
      "The Six of Swords represents transition, change, and the importance of moving on and traveling.",
  },
  {
    id: 56,
    name: "Seven of Swords",
    arcana: "minor",
    suit: "swords",
    number: 7,
    img: "/cards/swords/seven.jpg",
    meanings: {
      upright: ["Deception", "Betrayal", "Strategic thinking", "Avoidance"],
      reversed: [
        "Confession",
        "Coming clean",
        "Revealing secrets",
        "Avoidance of deception",
      ],
    },
    description:
      "The Seven of Swords represents deception, betrayal, and the importance of strategic thinking.",
  },
  {
    id: 57,
    name: "Eight of Swords",
    arcana: "minor",
    suit: "swords",
    number: 8,
    img: "/cards/swords/eight.jpg",
    meanings: {
      upright: ["Restriction", "Isolation", "Self-imposed limitations"],
      reversed: [
        "Freedom from restrictions",
        "New perspective",
        "Overcoming limitations",
        "Release from isolation",
      ],
    },
    description:
      "The Eight of Swords represents restriction, isolation, and the importance of overcoming self-imposed limitations.",
  },
  {
    id: 58,
    name: "Nine of Swords",
    arcana: "minor",
    suit: "swords",
    number: 9,
    img: "/cards/swords/nine.jpg",
    meanings: {
      upright: ["Anxiety", "Fear", "Nightmares", "Worry"],
      reversed: [
        "Release from anxiety",
        "Finding peace of mind",
        "Overcoming fears",
        "Acceptance of reality",
      ],
    },
    description:
      "The Nine of Swords represents anxiety, fear, and the importance of finding peace of mind.",
  },
  {
    id: 59,
    name: "Ten of Swords",
    arcana: "minor",
    suit: "swords",
    number: 10,
    img: "/cards/swords/ten.jpg",
    meanings: {
      upright: ["Betrayal", "Loss", "Endings", "Defeat"],
      reversed: [
        "Recovery from loss",
        "New beginnings after defeat",
        "Acceptance of endings",
        "Moving on from betrayal",
      ],
    },
    description:
      "The Ten of Swords represents betrayal, loss, and the importance of accepting endings and moving on.",
  },
  {
    id: 60,
    name: "Page of Swords",
    arcana: "minor",
    suit: "swords",
    number: 11,
    img: "/cards/swords/page.jpg",
    meanings: {
      upright: ["Curiosity", "Intellect", "New ideas", "Communication"],
      reversed: [
        "Deceit",
        "Lack of communication",
        "Dishonesty",
        "Confusion in thoughts",
      ],
    },
    description:
      "The Page of Swords represents curiosity, intellect, and the importance of new ideas and communication.",
  },
  {
    id: 61,
    name: "Knight of Swords",
    arcana: "minor",
    suit: "swords",
    number: 12,
    img: "/cards/swords/knight.jpg",
    meanings: {
      upright: ["Action", "Determination", "Ambition", "Intellectual"],
      reversed: [
        "Haste",
        "Impulsiveness",
        "Lack of direction",
        "Aggression without purpose",
      ],
    },
    description:
      "The Knight of Swords represents action, determination, and the importance of ambition and intellect.",
  },
  {
    id: 62,
    name: "Queen of Swords",
    arcana: "minor",
    suit: "swords",
    number: 13,
    img: "/cards/swords/queen.jpg",
    meanings: {
      upright: ["Independence", "Perceptiveness", "Clear-mindedness"],
      reversed: [
        "Cold-heartedness",
        "Overly critical",
        "Isolation from emotions",
        "Lack of empathy",
      ],
    },
    description:
      "The Queen of Swords represents independence, perceptiveness, and the importance of clear-mindedness.",
  },
  {
    id: 63,
    name: "King of Swords",
    arcana: "minor",
    suit: "swords",
    number: 14,
    img: "/cards/swords/king.jpg",
    meanings: {
      upright: ["Intellectual authority", "Truthful", "Fairness"],
      reversed: [
        "Manipulation",
        "Abuse of power",
        "Dishonesty in communication",
        "Lack of structure in thoughts",
      ],
    },
    description:
      "The King of Swords represents intellectual authority, truthfulness, and the importance of fairness.",
  },
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
  {
    id: 65,
    name: "Two of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 2,
    img: "/cards/pentacles/two.jpg",
    meanings: {
      upright: ["Balance", "Adaptability", "Time management", "Prioritization"],
      reversed: [
        "Overwhelm",
        "Disorganization",
        "Imbalance",
        "Inability to adapt",
      ],
    },
    description:
      "The Two of Pentacles represents balance, adaptability, and the importance of time management.",
  },
  {
    id: 66,
    name: "Three of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 3,
    img: "/cards/pentacles/three.jpg",
    meanings: {
      upright: ["Teamwork", "Collaboration", "Skill development", "Mastery"],
      reversed: [
        "Lack of teamwork",
        "Poor collaboration",
        "Incompetence",
        "Disconnection from goals",
      ],
    },
    description:
      "The Three of Pentacles represents teamwork, collaboration, and the importance of skill development.",
  },
  {
    id: 67,
    name: "Four of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 4,
    img: "/cards/pentacles/four.jpg",
    meanings: {
      upright: ["Control", "Security", "Conservation", "Possessiveness"],
      reversed: [
        "Greediness",
        "Instability",
        "Fear of loss",
        "Letting go of control",
      ],
    },
    description:
      "The Four of Pentacles represents control, security, and the importance of conservation.",
  },
  {
    id: 68,
    name: "Five of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 5,
    img: "/cards/pentacles/five.jpg",
    meanings: {
      upright: ["Financial loss", "Isolation", "Worry", "Insecurity"],
      reversed: [
        "Recovery from loss",
        "Improved financial situation",
        "Hope",
        "Overcoming adversity",
      ],
    },
    description:
      "The Five of Pentacles represents financial loss, isolation, and the importance of overcoming adversity.",
  },
  {
    id: 69,
    name: "Six of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 6,
    img: "/cards/pentacles/six.jpg",
    meanings: {
      upright: ["Generosity", "Charity", "Giving and receiving", "Balance"],
      reversed: ["Selfishness", "Inequality", "Debt", "Lack of generosity"],
    },
    description:
      "The Six of Pentacles represents generosity, charity, and the importance of balance in giving and receiving.",
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 7,
    img: "/cards/pentacles/seven.jpg",
    meanings: {
      upright: ["Patience", "Long-term view", "Sustainability", "Investment"],
      reversed: [
        "Lack of progress",
        "Short-term focus",
        "Impatience",
        "Disappointment in results",
      ],
    },
    description:
      "The Seven of Pentacles represents patience, long-term view, and the importance of sustainability.",
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 8,
    img: "/cards/pentacles/eight.jpg",
    meanings: {
      upright: [
        "Skill development",
        "Hard work",
        "Dedication",
        "Craftsmanship",
      ],
      reversed: [
        "Lack of ambition",
        "Poor quality work",
        "Disconnection from goals",
        "Avoidance of hard work",
      ],
    },
    description:
      "The Eight of Pentacles represents skill development, hard work, and the importance of dedication.",
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 9,
    img: "/cards/pentacles/nine.jpg",
    meanings: {
      upright: [
        "Abundance",
        "Luxury",
        "Self-sufficiency",
        "Financial independence",
      ],
      reversed: [
        "Financial setbacks",
        "Overindulgence",
        "Dependency on others",
        "Lack of self-sufficiency",
      ],
    },
    description:
      "The Nine of Pentacles represents abundance, luxury, and the importance of self-sufficiency.",
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 10,
    img: "/cards/pentacles/ten.jpg",
    meanings: {
      upright: ["Wealth", "Inheritance", "Family", "Long-term success"],
      reversed: [
        "Financial failure",
        "Lack of stability",
        "Disconnection from family",
        "Loss of legacy",
      ],
    },
    description:
      "The Ten of Pentacles represents wealth, inheritance, and the importance of family and long-term success.",
  },
  {
    id: 74,
    name: "Page of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 11,
    img: "/cards/pentacles/page.jpg",
    meanings: {
      upright: ["Manifestation", "New opportunities", "Study", "Practicality"],
      reversed: [
        "Lack of progress",
        "Disconnection from goals",
        "Lack of ambition",
        "Missed opportunities",
      ],
    },
    description:
      "The Page of Pentacles represents manifestation, new opportunities, and the importance of practicality.",
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 12,
    img: "/cards/pentacles/knight.jpg",
    meanings: {
      upright: ["Hard work", "Responsibility", "Routine", "Dependability"],
      reversed: [
        "Stagnation",
        "Lack of progress",
        "Overly cautiousness",
        "Avoidance of responsibility",
      ],
    },
    description:
      "The Knight of Pentacles represents hard work, responsibility, and the importance of routine and dependability.",
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 13,
    img: "/cards/pentacles/queen.jpg",
    meanings: {
      upright: ["Nurturing", "Practicality", "Financial security", "Comfort"],
      reversed: [
        "Neglecting self-care",
        "Overprotectiveness",
        "Financial insecurity",
        "Disconnection from practicality",
      ],
    },
    description:
      "The Queen of Pentacles represents nurturing, practicality, and the importance of financial security and comfort.",
  },
  {
    id: 77,
    name: "King of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 14,
    img: "/cards/pentacles/king.jpg",
    meanings: {
      upright: ["Wealth", "Business", "Leadership", "Stability"],
      reversed: [
        "Financial irresponsibility",
        "Corruption",
        "Lack of discipline",
        "Disconnection from values",
      ],
    },
    description:
      "The King of Pentacles represents wealth, business acumen, and the importance of leadership and stability.",
  },
];

export default tarotDeck;
