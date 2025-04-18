import React from "react";

const TarotCard = ({ card, isReversed, isSelected, onClick }) => {
  const cardStyles = `
    cursor-pointer 
    transition-all 
    duration-300 
    transform 
    ${isSelected ? "scale-110 shadow-lg" : "hover:scale-105"} 
    ${isReversed ? "rotate-180" : ""}
  `;

  return (
    <div className={cardStyles} onClick={onClick}>
      {card ? (
        <img
          src={card.image}
          alt={card.name}
          className="rounded-lg border-2 border-mystic-500 h-56 w-auto"
        />
      ) : (
        <div className="rounded-lg border-2 border-mystic-500 h-56 w-36 bg-gradient-to-br from-mystic-50 to-mystic-100 flex items-center justify-center">
          <span className="text-mystic-700 font-serif text-lg">Tarot</span>
        </div>
      )}
    </div>
  );
};

export default TarotCard;
