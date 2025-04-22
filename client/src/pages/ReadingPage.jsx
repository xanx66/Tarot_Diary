// client/src/pages/ReadingPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TarotCard from "../components/TarotCard";
import tarotService from "../services/tarotService";
import "../styles/ReadingPage.css";

const ReadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const question = queryParams.get("question") || "";

  // Reading state
  const [shuffling, setShuffling] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [revealedCardIds, setRevealedCardIds] = useState([]);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [readingResult, setReadingResult] = useState(null);
  const [maxSelections] = useState(3);
  const [deckDisplayed, setDeckDisplayed] = useState(false);

  // Card positions for 3-card spread
  const cardPositions = ["Past", "Present", "Future"];

  // Initialize deck
  useEffect(() => {
    initializeDeck();
  }, []);

  // Watch for complete selection and generate reading
  useEffect(() => {
    if (
      selectedCardIds.length === maxSelections &&
      revealedCardIds.length === maxSelections
    ) {
      generateReadingResults();
    }
  }, [revealedCardIds]);

  // Initialize the deck with all 78 cards
  const initializeDeck = () => {
    const fullDeck = tarotService.getFullDeck();
    const preparedDeck = fullDeck.map((card) => ({
      ...card,
      selected: false,
      revealed: false,
      isReversed: Math.random() > 0.7, // 30% chance of being reversed
    }));

    setCardDeck(preparedDeck);
  };

  // Handle the shuffle animation and randomize the deck
  const handleShuffle = () => {
    if (shuffling || selectedCardIds.length > 0) return;

    setShuffling(true);

    // Show shuffle animation for 2 seconds
    setTimeout(() => {
      const shuffledDeck = tarotService.getShuffledDeck().map((card) => ({
        ...card,
        selected: false,
        revealed: false,
        isReversed: Math.random() > 0.7, // Randomize card orientation
      }));

      setCardDeck(shuffledDeck);
      setShuffling(false);
      setDeckDisplayed(true);
    }, 2000);
  };

  // Handle card selection
  const handleCardClick = (cardId) => {
    if (
      shuffling ||
      selectionComplete ||
      selectedCardIds.length >= maxSelections
    )
      return;

    // If card is already selected, deselect it
    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds(selectedCardIds.filter((id) => id !== cardId));
      return;
    }

    // Select the card
    const newSelectedIds = [...selectedCardIds, cardId];
    setSelectedCardIds(newSelectedIds);

    // If we've reached max selections, begin the reveal process
    if (newSelectedIds.length === maxSelections) {
      setSelectionComplete(true);

      // Reveal cards one by one with delay
      newSelectedIds.forEach((id, index) => {
        setTimeout(() => {
          setRevealedCardIds((prev) => [...prev, id]);
        }, (index + 1) * 1000); // Stagger reveals by 1 second
      });
    }
  };

  // Generate the reading results once all cards are revealed
  const generateReadingResults = () => {
    // Get the selected cards with their details
    const selectedCards = selectedCardIds.map((id, index) => {
      const card = cardDeck.find((c) => c.id === id);
      return {
        ...card,
        position: cardPositions[index],
        isRevealed: true,
      };
    });

    // Create reversals array for the reading
    const reversals = selectedCards.map((card) => card.isReversed);

    // Generate the complete reading
    const reading = tarotService.generateReading(
      selectedCardIds,
      cardPositions,
      reversals
    );

    setReadingResult(reading);
  };

  // Start a new reading
  const handleNewReading = () => {
    // Reset all states
    setSelectedCardIds([]);
    setRevealedCardIds([]);
    setSelectionComplete(false);
    setReadingResult(null);
    setDeckDisplayed(false);

    // Re-initialize deck
    initializeDeck();
  };

  return (
    <div className="reading-page">
      <div className="stars-container">
        {/* Stars effect from background */}
      </div>

      <div className="reading-content">
        <h2 className="question-display">
          {question ? `"${question}"` : "......input the question here......"}
        </h2>

        {!deckDisplayed ? (
          <div className={`deck-container ${shuffling ? "shuffling" : ""}`}>
            <div className="tarot-deck" onClick={handleShuffle}>
              <TarotCard backImage="/cards/back.png" showBorder={true} />
            </div>

            <button
              className="shuffle-btn"
              onClick={handleShuffle}
              disabled={shuffling}
            >
              Shuffle
            </button>
          </div>
        ) : (
          <div className="reading-area">
            {!selectionComplete ? (
              <>
                <p className="selection-guidance">
                  Select three cards for your reading
                </p>

                <div className="card-fan">
                  {cardDeck.map((card, index) => (
                    <TarotCard
                      key={card.id}
                      id={card.id}
                      frontImage={card.img}
                      isSelected={selectedCardIds.includes(card.id)}
                      isRevealed={false}
                      isReversed={card.isReversed}
                      onClick={handleCardClick}
                      style={{
                        transform: `translateX(${index * 0.5}px) translateY(${
                          index * 0.2
                        }px) rotate(${index * 0.3 - 10}deg)`,
                        zIndex: index,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="selected-cards-container">
                <div className="selected-cards">
                  {selectedCardIds.map((cardId, index) => {
                    const card = cardDeck.find((c) => c.id === cardId);
                    return (
                      <TarotCard
                        key={cardId}
                        id={cardId}
                        frontImage={card.img}
                        isSelected={true}
                        isRevealed={revealedCardIds.includes(cardId)}
                        isReversed={card.isReversed}
                        position={cardPositions[index]}
                        animationDelay={index * 500}
                      />
                    );
                  })}
                </div>

                {readingResult && (
                  <div className="reading-interpretation">
                    <h3>Your Reading</h3>

                    <div className="cards-meaning">
                      {readingResult.cards.map((card, index) => (
                        <div key={index} className="card-meaning">
                          <h4>
                            {card.position}: {card.name}{" "}
                            {card.isReversed ? "(Reversed)" : ""}
                          </h4>
                          <p>
                            {card.isReversed
                              ? card.meanings.reversed.join(", ")
                              : card.meanings.upright.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="overall-interpretation">
                      <h4>Overall Interpretation</h4>
                      <p>{readingResult.overallInterpretation}</p>
                    </div>

                    <button
                      className="new-reading-btn"
                      onClick={handleNewReading}
                    >
                      New Reading
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingPage;
