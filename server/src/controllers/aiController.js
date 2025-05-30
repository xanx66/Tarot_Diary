const OpenAI = require("openai");
const {
  getSystemPrompt,
  buildInitialReadingUserMessage,
  buildChatUserMessage,
} = require("../prompts/gptPrompts.js");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const useOpenAI = process.env.USE_OPENAI === "true";

function parseAIResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return { reply: text, suggestions: [] };
  }
}

async function generateInitialReading(req, res) {
  const { question, cards, personality = "default", gender } = req.body;
  const systemPrompt = getSystemPrompt({ personality, gender });
  const userMessage = buildInitialReadingUserMessage(
    question,
    cards,
    personality,
    gender
  );

  if (useOpenAI) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 700,
        temperature: 0.8,
      });
      const ai = parseAIResponse(completion.choices[0].message.content);
      res.json(ai);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "AI request failed" });
    }
  } else {
    return res.json({
      reply: "This is a mock AI response for development.",
      suggestions: ["Mock suggestion 1", "Mock suggestion 2"],
      cards: req.body.cards || [],
    });
  }
}

async function chatWithAI(req, res) {
  const {
    chatHistory,
    userMessage,
    personality = "default",
    gender,
  } = req.body;
  const systemPrompt = getSystemPrompt({ personality, gender });
  const aiUserMessage = buildChatUserMessage(userMessage, personality, gender);

  const messages = [
    { role: "system", content: systemPrompt },
    ...(chatHistory || []),
    { role: "user", content: aiUserMessage },
  ];

  if (useOpenAI) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 600,
        temperature: 0.8,
      });
      const ai = parseAIResponse(completion.choices[0].message.content);
      res.json(ai);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "AI request failed" });
    }
  } else {
    return res.json({
      reply: "This is a mock AI response for development.",
      suggestions: ["Mock suggestion 1", "Mock suggestion 2"],
      cards: req.body.cards || [],
    });
  }
}

module.exports = {
  generateInitialReading,
  chatWithAI,
};
