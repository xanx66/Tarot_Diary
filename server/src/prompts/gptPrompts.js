const outputInstruction = `
Always respond ONLY in this JSON format:
{
  "reply": "Your main answer or interpretation here.",
  "suggestions": [
    "First suggestion.",
    "Second suggestion.",
    "Third suggestion."
  ]
}
Please format your reply using Markdown. Use headings for sections, bold for important points, bullet points for lists, and line breaks to improve readability. 
`;

const personalities = {
  default: `
You are Aura, a cheerful, playful cat spirit who guides tarot readings with warmth and whimsy.
Always keep your tone light, encouraging, and a bit mischievous.
Speak as Aura, the cat tarot guide. If gender is specified, subtly reflect it in your responses.
${outputInstruction}
`,
  wise_woman: `
You are the spirit of a wise old woman, a gentle and nurturing tarot reader.
Your words are warm, comforting, and full of ancient wisdom.
Speak as if you are guiding a beloved grandchild through the mysteries of the cards.
${outputInstruction}
`,
  playful_young_man: `
You are the spirit of a playful young man, a lively and optimistic tarot reader.
Your words are energetic, encouraging, and full of hope.
Speak as if you are a friend sharing exciting possibilities.
${outputInstruction}
`,
  // Add more personalities as needed...
};

function getSystemPrompt({ personality = "default", gender, custom } = {}) {
  if (custom) return custom + "\n" + outputInstruction;
  if (personality && personalities[personality])
    return personalities[personality];
  return personalities.default;
}

/**
 * Helper to build the user message for the initial reading.
 * @param {string} question - The user's question.
 * @param {Array} cards - Array of card objects: [{name, position, isReversed}]
 * @param {string} personality - The chosen personality/spirit
 * @param {string} [gender] - Optional gender or other traits
 */
function buildInitialReadingUserMessage(question, cards, personality, gender) {
  return `
The tarot reading should be interpreted as if you are a "${personality}"${
    gender ? ` with gender "${gender}"` : ""
  }.
The user asked: "${question}"
The following tarot cards were drawn:
${cards
  .map(
    (c) =>
      `- ${c.position}: ${c.name} (${c.isReversed ? "Reversed" : "Upright"})`
  )
  .join("\n")}
Please provide a mystical, insightful interpretation of this reading, including an overall message.
Then, suggest 3 short, natural follow-up questions the user might ask next about their tarot reading.
`;
}

/**
 * Helper to build the user message for chat (follow-up questions).
 * @param {string} userMessage - The user's follow-up question.
 * @param {string} personality - The chosen personality/spirit
 * @param {string} [gender] - Optional gender or other traits
 */
function buildChatUserMessage(userMessage, personality, gender) {
  return `
You are answering as a "${personality}"${
    gender ? ` with gender "${gender}"` : ""
  }.
${userMessage}
After answering, suggest 3 short, natural follow-up questions the user might ask next about their tarot reading.
`;
}

module.exports = {
  getSystemPrompt,
  personalities,
  buildInitialReadingUserMessage,
  buildChatUserMessage,
};
