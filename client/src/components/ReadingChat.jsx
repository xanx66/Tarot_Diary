import React, { useState } from "react";
import "../styles/ReadingChat.css"; // You will create this for the cosmic style

const ReadingChat = ({
  initialReading, // { cards: [...], overallInterpretation: "...", question: "..." }
  onSendMessage,  // async (message, chatHistory) => { ... } (for GPT API)
  suggestedResponses = [],
}) => {
  const [chat, setChat] = useState([
    {
      role: "assistant",
      content: (
        <div>
          <div className="chat-reading-header">
            <span className="chat-moon-icon">🌙</span>
            <span className="chat-question">{initialReading.question}</span>
          </div>
          <div className="chat-cards-reveal">
            {initialReading.cards.map((card, idx) => (
              <div key={card.id} className="chat-card-summary">
                <img src={card.img} alt={card.name} className="chat-card-img" />
                <div>
                  <b>{card.position}: {card.name} {card.isReversed ? "(Reversed)" : ""}</b>
                  <div className="chat-card-meaning">
                    {card.isReversed
                      ? card.meanings.reversed.join(", ")
                      : card.meanings.upright.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-overall-interpretation">
            <b>Overall:</b> {initialReading.overallInterpretation}
          </div>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending a message (user input or suggested)
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setChat((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);

    // Call GPT API (or parent handler)
    if (onSendMessage) {
      const response = await onSendMessage(message, chat);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="reading-chat-cosmic">
      <div className="chat-history">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {typeof msg.content === "string" ? (
              <span>{msg.content}</span>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble assistant loading">
            <span className="chat-typing-dots">...</span>
          </div>
        )}
      </div>
      <div className="chat-suggestions">
        {suggestedResponses.map((resp, idx) => (
          <button
            key={idx}
            className="chat-suggestion-btn"
            onClick={() => sendMessage(resp)}
            disabled={loading}
          >
            {resp}
          </button>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask more about your reading..."
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ReadingChat;
