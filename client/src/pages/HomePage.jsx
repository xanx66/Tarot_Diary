// client/src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleStartReading = () => {
    // Validate the question input
    if (errorMessage) {
      setErrorMessage("");
    }

    // Check if the question is valid (not empty)
    if (question.trim() === "") {
      setErrorMessage("Please enter a question.");
      return;
    }

    // Navigate to the ReadingPage with the question as a query parameter
    navigate(`/reading?question=${encodeURIComponent(question)}`);
    setQuestion("");
  };

  return (
    <div className="home-page">
      <div className="content-container">
        <div className="question-area">
          <h2 className="question-prompt">
            What would you like to talk
            <br />
            about today?
          </h2>

          <div className="input-container">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="My question is ..."
              className="question-input"
            />
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>

        <button className="start-reading-btn" onClick={handleStartReading}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default HomePage;
