// client/src/components/TarotCard.jsx
import React, { useState, useEffect } from "react";
import "../styles/TarotCard.css";

const TarotCard = ({
  id,
  frontImage = "/cards/back.png",
  backImage = "/cards/back.png",
  isShuffling = true,
  isReversed = false,
  isSelected = false,
  isRevealed = false,
  position = null,
  onClick = () => {},
  style = {},
  className = "",
  showBorder = true,
  animationDelay = 0,
}) => {
  const [revealed, setRevealed] = useState(isRevealed);
  const [selected, setSelected] = useState(isSelected);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setSelected(isSelected);

    // Apply reveal animation if the card becomes revealed
    if (isRevealed && !revealed) {
      setTimeout(() => {
        setAnimationClass("reveal-animation");
        setTimeout(() => {
          setRevealed(true);
        }, 300); // Half of animation time
      }, animationDelay);
    } else {
      setRevealed(isRevealed);
    }
  }, [isSelected, isRevealed, revealed, animationDelay]);

  const handleClick = () => {
    if (!selected && !revealed) {
      onClick(id);
    }
  };

  const cardClasses = `
    tarot-card ${className} 
    ${isShuffling ? "shuffling" : ""}
    ${selected ? "selected" : ""} 
    ${revealed ? "revealed" : ""} 
    ${isReversed ? "reversed" : ""} 
    ${animationClass} 
    ${showBorder ? "with-border" : ""}
  `;

  return (
    <div
      className={cardClasses}
      style={{
        ...style,
        transitionDelay: `${animationDelay}ms`,
      }}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div
          className="card-front"
          style={{ backgroundImage: `url(${frontImage})` }}
        >
          {position && <div className="card-position">{position}</div>}
        </div>
        <div
          className="card-back"
          style={{ backgroundImage: `url(${backImage})` }}
        >
          {/* Card back pattern is handled in CSS */}
        </div>
      </div>

      {/* Glow effect for selected cards */}
      {selected && <div className="card-glow"></div>}

      {/* Show position indicator */}
      {position && selected && revealed && (
        <div className={`position-indicator ${isReversed ? "reversed" : ""}`}>
          {position}
        </div>
      )}
    </div>
  );
};

export default TarotCard;
