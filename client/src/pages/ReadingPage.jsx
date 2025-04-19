// client/src/pages/ReadingPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReadingPage = () => {
  const location = useLocation();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract question from URL parameters
    const params = new URLSearchParams(location.search);
    const questionParam = params.get("question");
    if (questionParam) {
      setQuestion(questionParam);
    }

    // Simulate loading of cards
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat">
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-8 py-8 text-[#e8e3d0] animate-fadeIn">
        {/* Question Display */}
        {question && (
          <div className="mb-8 text-center">
            <h2 className="text-xl font-['Ojuju'] font-light opacity-80">
              Your Question:
            </h2>
            <p className="text-2xl font-['Hedvig_Letters_Serif'] mt-2">
              "{question}"
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-2 border-b-2 border-[#e8e3d0] rounded-full animate-spin mb-4"></div>
            <p className="font-['Ojuju'] text-lg">Consulting the cards...</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-['Hedvig_Letters_Serif'] mb-8">
              This is a placeholder for the tarot reading page.
            </p>
            <p className="font-['Ojuju'] text-lg">
              Here you'll display the selected cards and their interpretations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingPage;
