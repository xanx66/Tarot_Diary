import React, { useState, useEffect, useRef } from "react";
import { useSpring, useSprings, animated, config } from "@react-spring/web";
import tarotDeck from "../data/tarotDeck";

const CARD_COUNT = 5;

// Some example tarot card images (using placeholder)
const cards = tarotDeck;

const TarotShuffle = () => {
  const [shuffleCount, setShuffleCount] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardOrientations, setCardOrientations] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const cardRefs = useRef([]);

  // Initialize with random cards and orientations
  useEffect(() => {
    const randomCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, CARD_COUNT);

    // Generate random orientations (true = reversed/inverted)
    const randomOrientations = Array(CARD_COUNT)
      .fill(0)
      .map(() => Math.random() > 0.5);

    setSelectedCards(randomCards);
    setCardOrientations(randomOrientations);

    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, CARD_COUNT);
  }, [shuffleCount]);

  // Card pile spring animation
  const pileProps = useSpring({
    from: { scale: 1.1, boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.3)" },
    to: { scale: 1.0, boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.2)" },
    config: { tension: 300, friction: 20 },
  });

  // Individual card springs for the spread
  const [springs, api] = useSprings(CARD_COUNT, (index) => {
    // Initial state (stacked)
    return {
      x: 0,
      y: 0,
      rotate: cardOrientations[index] ? 180 : 0, // Apply 180° rotation for reversed cards
      scale: 1,
      zIndex: CARD_COUNT - index,
      delay: index * 100,
    };
  });

  // Performs a dovetail/riffle shuffle animation
  const performRiffleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    // First gather all cards to the center in a stack
    api.start((i) => ({
      to: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 10,
      },
      config: { tension: 400, friction: 30 },
      delay: i * 50,
    }));

    // After gathering, start the riffle shuffle sequence
    setTimeout(() => {
      // Split the deck into two halves (left and right)
      const leftPacket = Array(Math.ceil(CARD_COUNT / 2))
        .fill(0)
        .map((_, i) => i);
      const rightPacket = Array(Math.floor(CARD_COUNT / 2))
        .fill(0)
        .map((_, i) => i + Math.ceil(CARD_COUNT / 2));

      // Step 1: Separate the two halves (left and right)
      api.start((i) => {
        const isLeftPacket = leftPacket.includes(i);
        const packetIndex = isLeftPacket
          ? leftPacket.indexOf(i)
          : rightPacket.indexOf(i);

        return {
          to: {
            x: isLeftPacket ? -60 : 60,
            y: 0,
            zIndex: 20 + packetIndex,
            rotate: 0,
            scale: 1,
          },
          config: { tension: 400, friction: 30 },
          delay: packetIndex * 30,
        };
      });

      // Step 2: Prepare for interleaving (angle cards slightly)
      setTimeout(() => {
        api.start((i) => {
          const isLeftPacket = leftPacket.includes(i);
          return {
            to: {
              rotate: isLeftPacket ? -5 : 185,
              y: isLeftPacket ? -2 : -2,
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
                  return {
                    to: {
                      x: 0,
                      y: 0,
                      rotate: leftPacket.includes(i) ? 0 : 180,
                      zIndex: 30 + newPosition,
                    },
                    config: { tension: 200, friction: 20 },
                  };
                }
                return {};
              });
            }, newPosition * 80);
          });

          // Step 4: After shuffling is complete, spread the cards
          setTimeout(() => {
            setShuffleCount((count) => count + 1);

            // Final spread with proper orientation
            setTimeout(() => {
              api.start((i) => {
                // Generate random positions for the spread
                const x = (i - (CARD_COUNT - 1) / 2) * 80;
                const y = 30 * Math.sin((i / (CARD_COUNT - 1)) * Math.PI);

                // Apply significant rotation based on orientation (reversed or not)
                // Plus a small random tilt (-10 to +10 degrees) for natural appearance
                const baseRotation = cardOrientations[i] ? 180 : 0;
                const tiltAdjustment = -10 + Math.random() * 20;
                const rotate = baseRotation + tiltAdjustment;

                return {
                  to: {
                    x,
                    y,
                    rotate,
                    scale: 1.05,
                    zIndex: CARD_COUNT - i,
                  },
                  config: { tension: 300, friction: 28 },
                  delay: i * 100,
                };
              });

              setIsShuffling(false);
            }, 100);
          }, shuffledIndices.length * 80 + 300);
        }, 400);
      }, 300);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-indigo-900 mb-2">
          Tarot Card Shuffle
        </h1>
        <p className="text-gray-600">
          Click the deck for a dovetail shuffle and reading
        </p>
      </div>

      <div className="relative w-full h-64">
        {/* Card pile/deck */}
        <animated.div
          className="absolute cursor-pointer"
          style={{
            ...pileProps,
            left: "calc(50% - 60px)",
            top: "-60px",
            width: "120px",
            height: "200px",
            backgroundColor: "#321c64",
            borderRadius: "8px",
            backgroundImage: `url('/api/placeholder/120/200')`,
            backgroundSize: "cover",
            zIndex: 10,
          }}
          onClick={performRiffleShuffle}
          disabled={isShuffling}
        >
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">Tarot Deck</span>
          </div>
        </animated.div>

        {/* Spread cards */}
        {springs.map((props, i) => (
          <animated.div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              ...props,
              position: "absolute",
              width: "120px",
              height: "200px",
              backgroundImage: selectedCards[i]
                ? `url('/api/placeholder/120/200')`
                : "none",
              backgroundSize: "cover",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              left: "calc(50% - 60px)",
              top: "80px",
              transformOrigin: "center center",
            }}
          >
            <div className="absolute inset-0 rounded-lg border border-indigo-200 flex items-center justify-center p-2">
              <span className="text-indigo-800 font-medium text-center">
                {selectedCards[i]?.name || ""}
                {cardOrientations[i] && (
                  <span className="block text-red-500 text-sm mt-1">
                    (Reversed)
                  </span>
                )}
              </span>
            </div>
          </animated.div>
        ))}
      </div>

      <button
        className={`mt-12 px-6 py-2 bg-indigo-600 text-white rounded-lg ${
          isShuffling ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
        onClick={performRiffleShuffle}
        disabled={isShuffling}
      >
        {isShuffling ? "Shuffling..." : "Shuffle Again"}
      </button>
    </div>
  );
};

export default TarotShuffle;
