import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TarotCard from "./TarotCard";
import { saveReading } from "../redux/readingSlice";
import { performReading } from "../api/tarotApi";

const spreadTypes = [
  { id: "single", name: "Single Card", count: 1 },
  { id: "three-card", name: "Three Card", count: 3 },
  { id: "celtic-cross", name: "Celtic Cross", count: 10 },
];

const ReadingInterface = () => {
  const [selectedSpread, setSelectedSpread] = useState(spreadTypes[0]);
  const [question, setQuestion] = useState("");
  const [reading, setReading] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSpreadChange = (spreadId) => {
    const spread = spreadTypes.find((s) => s.id === spreadId);
    setSelectedSpread(spread);
  };

  const handleReadingRequest = async () => {
    setIsLoading(true);
    try {
      const result = await performReading({
        spreadType: selectedSpread.name,
        question,
      });
      setReading(result);
      dispatch(saveReading(result));
    } catch (error) {
      console.error("Error performing reading:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-serif text-mystic-900 mb-6">
        New Tarot Reading
      </h2>

      {/* Spread Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Your Spread
        </label>
        <div className="flex space-x-4">
          {spreadTypes.map((spread) => (
            <button
              key={spread.id}
              className={`px-4 py-2 rounded-md ${
                selectedSpread.id === spread.id
                  ? "bg-mystic-500 text-white"
                  : "bg-mystic-100 text-mystic-700 hover:bg-mystic-200"
              }`}
              onClick={() => handleSpreadChange(spread.id)}
            >
              {spread.name}
            </button>
          ))}
        </div>
      </div>

      {/* Question Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What would you like to know? (optional)
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-mystic-500 focus:border-mystic-500"
          rows="3"
          placeholder="Enter your question..."
        ></textarea>
      </div>

      <button
        onClick={handleReadingRequest}
        disabled={isLoading}
        className="w-full py-3 bg-mystic-700 text-white rounded-md hover:bg-mystic-900 transition-colors duration-300 disabled:bg-gray-400"
      >
        {isLoading ? "Consulting the cards..." : "Draw Cards"}
      </button>

      {/* Display Reading */}
      {reading && (
        <div className="mt-10">
          <h3 className="text-xl font-serif text-mystic-900 mb-4">
            Your Reading
          </h3>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {reading.cards.map((cardData, index) => (
              <div key={index} className="text-center">
                <TarotCard
                  card={cardData.card}
                  isReversed={cardData.isReversed}
                  isSelected={true}
                />
                <p className="mt-2 text-sm font-medium">{cardData.position}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-mystic-50 to-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-serif text-mystic-900 mb-3">
              Interpretation
            </h4>
            <div className="prose">
              {reading.aiInterpretation.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingInterface;
