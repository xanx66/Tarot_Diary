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
  const userMessage = buildInitialReadingUserMessage(question, cards, personality, gender);

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
}

async function chatWithAI(req, res) {
  const { chatHistory, userMessage, personality = "default", gender } = req.body;
  const systemPrompt = getSystemPrompt({ personality, gender });
  const aiUserMessage = buildChatUserMessage(userMessage, personality, gender);

  const messages = [
    { role: "system", content: systemPrompt },
    ...(chatHistory || []),
    { role: "user", content: aiUserMessage },
  ];

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
}

module.exports = {
  generateInitialReading,
  chatWithAI,
};
