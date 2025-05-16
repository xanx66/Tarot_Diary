import React, { useState, useEffect } from "react";
import "../styles/ReadingChat.css"; // You will create this for the cosmic style
import { getInitialReading, chatWithAI } from "../api/tarotApi";

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

  // Fetch initial reading from API on mount
  useEffect(() => {
    const fetchInitialReading = async () => {
      setInitialLoading(true);
      try {
        const data = await getInitialReading({
          question,
          cards: cards.map(card => ({
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
  }, []);

  // Send user message and get AI reply
  const sendMessage = async (message) => {
    if (!message.trim()) return;
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
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      setSuggestedResponses(data.suggestions || []);
    } catch (e) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't get a response from the AI." },
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

  return (
    <div className="reading-chat-cosmic">
      <div className="chat-history">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.role === "user" ? "user" : "assistant"}`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
        {(loading || initialLoading) && <LoadingBubble />}
      </div>
      <div className="chat-suggestions">
        {suggestedResponses.map((resp, idx) => (
          <button
            key={idx}
            className="chat-suggestion-btn"
            onClick={() => sendMessage(resp)}
            disabled={loading || initialLoading}
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
          disabled={loading || initialLoading}
        />
        <button
          className="chat-send-btn"
          onClick={() => sendMessage(input)}
          disabled={loading || initialLoading || !input.trim()}
        >
          Send
        </button>
      </div>
      <div className="chat-bottom-row">
        <button
          className="new-reading-btn"
          onClick={onStartNewQuestion}
        >
          Start New Question
        </button>
      </div>
    </div>
  );
};

export default ReadingChat;
