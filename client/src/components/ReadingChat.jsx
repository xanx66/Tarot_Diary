import React, { useState, useEffect, useRef } from "react";
import "../styles/ReadingChat.css"; // You will create this for the cosmic style
import { getInitialReading, chatWithAI } from "../api/tarotApi";
import ReactMarkdown from "react-markdown";
import catProfile from "../../public/cat-profile.png"; // Use your own image path or fallback to emoji
import adImage from "../../public/ad-image.png";
import TarotCard from "./TarotCard";

const ReadingChat = ({
  question,
  cards,
  personality = "default",
  gender = "",
  onStartNewQuestion,
}) => {
  const [chat, setChat] = useState([]);
  const [suggestedResponses, setSuggestedResponses] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const chatEndRef = useRef(null);
  const MAX_CHAT_DEPTH = 1;
  const [adShown, setAdShown] = useState(false);
  const [revealing, setRevealing] = useState(true);
  const [revealedCards, setRevealedCards] = useState([]);
  const [revealedTextIdx, setRevealedTextIdx] = useState(-1);

  // Card reveal animation on mount
  useEffect(() => {
    if (!cards || cards.length === 0) {
      setRevealing(false);
      return;
    }
    setRevealedCards([]);
    setRevealedTextIdx(-1);
    let i = 0;
    function revealNext() {
      setRevealedCards((prev) => [...prev, cards[i]]);
      setRevealedTextIdx(i);
      i++;
      if (i < cards.length) {
        setTimeout(revealNext, 1000); // 1s per card
      } else {
        setTimeout(() => setRevealing(false), 1500); // slight pause before reading
      }
    }
    revealNext();
  }, [cards]);

  // Fetch initial reading from API after reveal
  useEffect(() => {
    if (revealing) return;
    const fetchInitialReading = async () => {
      setInitialLoading(true);
      try {
        const data = await getInitialReading({
          question,
          cards: cards.map((card) => ({
            name: card.name,
            position: card.position,
            isReversed: card.isReversed,
          })),
          personality,
          gender,
        });
        setChat([
          {
            role: "assistant",
            content: data.reply,
          },
        ]);
        setSuggestedResponses(data.suggestions || []);
      } catch (e) {
        setChat([
          {
            role: "assistant",
            content: "Sorry, I couldn't get an AI interpretation.",
          },
        ]);
        setSuggestedResponses([]);
      }
      setInitialLoading(false);
    };
    fetchInitialReading();
    // eslint-disable-next-line
  }, [revealing]);

  // Send user message and get AI reply
  const sendMessage = async (message) => {
    if (!message.trim() || adShown) return;
    // Count user messages (excluding assistant and ad)
    const userMsgCount = chat.filter((msg) => msg.role === "user").length;
    if (userMsgCount >= MAX_CHAT_DEPTH) {
      // Show ad instead of sending to AI
      setChat((prev) => [
        ...prev,
        { role: "user", content: message },
        {
          role: "ad",
          content:
            "# ✨ TarotTales App – Coming Soon! ✨\n\n**Unlock unlimited readings, journaling, and more with our upcoming app.**\n\n*Follow us for updates and be the first to try!*",
        },
      ]);
      setAdShown(true);
      setSuggestedResponses([]);
      setInput("");
      return;
    }
    setChat((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);

    const chatHistory = chat.map((msg) => ({
      role: msg.role,
      content: typeof msg.content === "string" ? msg.content : "",
    }));

    try {
      const data = await chatWithAI({
        chatHistory,
        userMessage: message,
        personality,
        gender,
      });
      setChat((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setSuggestedResponses(data.suggestions || []);
    } catch (e) {
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't get a response from the AI.",
        },
      ]);
      setSuggestedResponses([]);
    }
    setLoading(false);
  };

  // Loading animation (simple dots)
  const LoadingBubble = () => (
    <div className="chat-bubble assistant loading">
      <span className="chat-typing-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </div>
  );

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading, initialLoading]);

  return (
    <div className="reading-chat-cosmic">
      <div className="chat-history">
        <div className="card-reveal-animation">
          <div className="card-reveal-header">Your Cards:</div>
          <div className="card-reveal-row">
            {cards.map((card, idx) => (
              <div
                className="card-reveal-item"
                key={card.name + card.position + idx}
              >
                <TarotCard
                  id={card.id}
                  frontImage={card.img}
                  isReversed={card.isReversed}
                  isRevealed={revealing ? idx === revealedTextIdx : true}
                  position={card.position}
                  onClick={() => {}}
                />
                <div
                  className={`card-reveal-pos${
                    !revealing ||
                    idx === revealedTextIdx ||
                    (!revealing && idx < revealedCards.length)
                      ? " fade-in"
                      : ""
                  }`}
                >
                  {card.position}
                </div>
                <div
                  className={`card-reveal-name${
                    !revealing ||
                    idx === revealedTextIdx ||
                    (!revealing && idx < revealedCards.length)
                      ? " fade-in"
                      : ""
                  }`}
                >
                  {card.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Rest of chat bubbles, only after reveal */}
        {!revealing &&
          chat.map((msg, idx) => (
            <div className="chat-bubble-container">
              {msg.role === "assistant" && (
                <img
                  src={catProfile}
                  alt="Aura the Cat"
                  className="chat-profile-img"
                />
              )}
              <div
                key={idx}
                className={`chat-bubble ${
                  msg.role === "assistant"
                    ? "assistant"
                    : msg.role === "user"
                    ? "user"
                    : "ad"
                }`}
              >
                <div className="chat-bubble-content">
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : msg.role === "ad" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
                {msg.role === "ad" && (
                  <div className="chat-ad-image-container">
                    <img src={adImage} alt="Ad" className="chat-ad-image" />
                  </div>
                )}
              </div>
            </div>
          ))}
        {(loading || initialLoading) && <LoadingBubble />}
        <div ref={chatEndRef} />
      </div>
      {!adShown && (
        <div className="chat-suggestions">
          {suggestedResponses.map(
            (resp, idx) =>
              !adShown && (
                <button
                  key={idx}
                  className="chat-suggestion-btn"
                  onClick={() => sendMessage(resp)}
                  disabled={loading || initialLoading}
                >
                  {resp}
                </button>
              )
          )}
          <button className="start-new-btn" onClick={onStartNewQuestion}>
            Start New Reading
          </button>
        </div>
      )}
      {!adShown && (
        <div className="chat-input-row">
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask more about your reading..."
            disabled={loading || initialLoading || adShown}
            rows={1}
            style={{ resize: "vertical" }}
          />
          <button
            className="chat-send-btn"
            onClick={() => sendMessage(input)}
            disabled={loading || initialLoading || !input.trim() || adShown}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingChat;
