// client/src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleStartReading = () => {
    // Navigate to reading page with the question as state/query parameter if provided
    if (question.trim()) {
      navigate(`/reading?question=${encodeURIComponent(question)}`);
    } else {
      navigate("/reading");
    }
  };

  return (
    <div className="home-page">
      <div className="stars-container">{/* Stars are added via CSS */}</div>

      <div className="content-container">
        {/* Logo and title are now in the Header component */}

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
