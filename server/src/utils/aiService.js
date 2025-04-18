const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTarotInterpretation(reading) {
  try {
    const cardDetails = reading.cards
      .map((c) => {
        return `Card: ${c.card.name}${c.isReversed ? " (Reversed)" : ""}
Position: ${c.position}
Meaning: ${c.isReversed ? c.card.reversed : c.card.upright}`;
      })
      .join("\n\n");

    const userQuestion = reading.question
      ? `The querent asked: "${reading.question}"\n\n`
      : "No specific question was asked.\n\n";

    const prompt = `As a tarot reader, please provide an interpretation of the following ${reading.spreadType} spread:
    
${userQuestion}
${cardDetails}

Provide a holistic, intuitive interpretation of how these cards interact, what story they tell, and what guidance they offer to the querent.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or whatever model you prefer
      messages: [
        {
          role: "system",
          content:
            "You are an experienced tarot reader with deep knowledge of symbolism and psychology.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI interpretation:", error);
    return "Unable to generate AI interpretation at this time.";
  }
}

module.exports = { generateTarotInterpretation };
