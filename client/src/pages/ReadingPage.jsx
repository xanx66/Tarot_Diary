// client/src/pages/ReadingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpring, useSprings, animated, config } from "@react-spring/web";
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
  const cardRefs = useRef([]);
  const CARDS_TO_SHOW = 51;

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

  // Card pile spring animation
  const pileProps = useSpring({
    from: { scale: 1.1, boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.3)" },
    to: { scale: 1.0, boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.2)" },
    config: { tension: 300, friction: 20 },
  });

  // Initialize springs for cards (will be used during shuffle)
  const [springs, api] = useSprings(CARDS_TO_SHOW, (index) => {
    // Initial state (stacked)
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      zIndex: CARDS_TO_SHOW - index,
      opacity: 1,
      delay: index * 100,
    };
  });

  // Initialize the deck with all 78 cards
  const initializeDeck = () => {
    const fullDeck = tarotService.getFullDeck();
    const preparedDeck = fullDeck.map((card) => ({
      ...card,
      selected: false,
      revealed: false,
      isReversed: Math.random() > 0.5,
    }));

    setCardDeck(preparedDeck);
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, CARDS_TO_SHOW);
  };

  // Performs a dovetail/riffle shuffle animation
  const performRiffleShuffle = () => {
    if (shuffling || selectedCardIds.length > 0) return;

    setShuffling(true);

    // First gather all cards to the center in a stack
    api.start((i) => ({
      to: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
      },
      config: { tension: 400, friction: 30 },
      delay: i * 20,
    }));

    // After gathering, start the riffle shuffle sequence
    setTimeout(() => {
      // Split the deck into two halves (left and right)
      const leftPacket = Array(Math.ceil(CARDS_TO_SHOW / 2))
        .fill(0)
        .map((_, i) => i);
      const rightPacket = Array(Math.floor(CARDS_TO_SHOW / 2))
        .fill(0)
        .map((_, i) => i + Math.ceil(CARDS_TO_SHOW / 2));

      // Step 1: Separate the two halves (left and right)
      api.start((i) => {
        const isLeftPacket = leftPacket.includes(i);
        const packetIndex = isLeftPacket
          ? leftPacket.indexOf(i)
          : rightPacket.indexOf(i);

        return {
          to: {
            x: isLeftPacket ? -120 : 120, // Increased separation
            y: 0,
            zIndex: 20 + packetIndex,
            rotate: 0,
            scale: 1,
            opacity: 1,
          },
          config: { tension: 400, friction: 30 },
          delay: packetIndex * 10,
        };
      });

      // Step 2: Prepare for interleaving (angle cards slightly)
      setTimeout(() => {
        api.start((i) => {
          const isLeftPacket = leftPacket.includes(i);
          return {
            to: {
              rotate: isLeftPacket ? -10 : 10, // More noticeable angle
              y: isLeftPacket ? -5 : -5,
            },
            config: { tension: 300, friction: 25 },
          };
        });

        // Step 3: Perform the riffle/dovetail interleaving
        setTimeout(() => {
          // Create the shuffled order - alternating from each packet with slight randomness
          let shuffledIndices = [];
          let leftIdx = 0;
          let rightIdx = 0;

          while (leftIdx < leftPacket.length && rightIdx < rightPacket.length) {
            // Slightly random interleaving (1-3 cards at a time from each packet)
            const dropCount = Math.floor(Math.random() * 2) + 1;
            const takeFromLeft = Math.random() > 0.5;

            if (takeFromLeft) {
              for (
                let j = 0;
                j < dropCount && leftIdx < leftPacket.length;
                j++
              ) {
                shuffledIndices.push(leftPacket[leftIdx++]);
              }
            } else {
              for (
                let j = 0;
                j < dropCount && rightIdx < rightPacket.length;
                j++
              ) {
                shuffledIndices.push(rightPacket[rightIdx++]);
              }
            }
          }

          // Add any remaining cards
          while (leftIdx < leftPacket.length) {
            shuffledIndices.push(leftPacket[leftIdx++]);
          }
          while (rightIdx < rightPacket.length) {
            shuffledIndices.push(rightPacket[rightIdx++]);
          }

          // Animate the interleaving
          shuffledIndices.forEach((cardIndex, newPosition) => {
            setTimeout(() => {
              api.start((i) => {
                if (i === cardIndex) {
                  const card = cardDeck[i % cardDeck.length];
                  return {
                    to: {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      zIndex: -CARDS_TO_SHOW + newPosition,
                      scale: 1,
                    },
                    config: { tension: 200, friction: 50 },
                  };
                }
                return {};
              });
            }, newPosition * 20);
          });

          // Step 4: After shuffling is complete, prepare the card fan
          setTimeout(() => {
            // Final fan spread
            setTimeout(() => {
              // Position cards in a fan layout
              api.start((i) => {
                // Generate fan positions - more compact arrangement
                const fanWidth = Math.min(window.innerWidth - 60, 1200);
                const centerX = 0;
                const centerY = 900;
                const radius = Math.min(900, window.innerWidth * 0.9);
                const startAngle = -30;
                const endAngle = 30;
                const angleStep = (endAngle - startAngle) / (CARDS_TO_SHOW - 1);
                const angle = startAngle + i * angleStep;
                const radians = (angle * Math.PI) / 180;

                // Calculate position on arc
                const x = centerX + Math.sin(radians) * radius;
                const y = centerY - Math.cos(radians) * radius;

                // Card rotation - align to the fan curve
                const cardRotation = angle;

                // Stagger the cards slightly in z-index for overlapping effect
                const zIndex = -CARDS_TO_SHOW * 2 + i;

                return {
                  to: {
                    x,
                    y,
                    rotate: cardRotation,
                    scale: 0.9,
                    zIndex,
                    opacity: 1,
                  },
                  config: { tension: 300, friction: 28 },
                  delay: i * 20,
                };
              });

              // After animations complete, update state
              setTimeout(() => {
                setShuffling(false);
                setDeckDisplayed(true);
              }, 500);
            }, 100);
          }, shuffledIndices.length * 20 + 200);
        }, 400);
      }, 300);
    }, 600);
  };

  // Handle card selection
  const handleCardClick = (cardId) => {
    if (
      !deckDisplayed ||
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
    navigate("/");
  };

  return (
    <div className="reading-page">
      <div className="stars-container">
        {/* Stars effect from background */}
      </div>

      <div className="reading-content">
        <h2 className="question-display">{question}</h2>

        <div className="reading-area">
          {!selectionComplete ? (
            <>
              {deckDisplayed && <p className="selection-guidance">
                Select three cards for your reading
              </p>}

              <div className="card-fan">
                {springs.map((style, index) => {
                  // Use modulo to cycle through the deck
                  const cardIndex = index % cardDeck.length;
                  const card = cardDeck[cardIndex];
                  if (!card) return null;

                  return (
                    <animated.div
                      key={`${card.id}-${index}`}
                      className={`animated-wrapper ${
                        selectedCardIds.includes(card.id) ? "selected" : ""
                      }`}
                      ref={(el) => (cardRefs.current[index] = el)}
                      style={{
                        ...style,
                        transformOrigin: "bottom center",
                      }}
                    >
                      <TarotCard
                        id={card.id}
                        frontImage={card.img}
                        backImage="/cards/back.png"
                        isShuffling={!deckDisplayed}
                        isSelected={selectedCardIds.includes(card.id)}
                        isRevealed={false}
                        isReversed={card.isReversed}
                        onClick={() => handleCardClick(card.id)}
                      />
                    </animated.div>
                  );
                })}
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
                      backImage="/cards/back.png"
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
        {!deckDisplayed && (
          <div className={`deck-container ${shuffling ? "shuffling" : ""}`}>
            <button
              className="shuffle-btn"
              onClick={performRiffleShuffle}
              disabled={shuffling}
            >
              {shuffling ? "Shuffling..." : "Shuffle"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingPage;
