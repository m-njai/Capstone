import React, { useState } from "react";
import "./ChatAssistant.css";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate a bot response (backend to come)
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: `You said: "${input}"` }]);
    }, 500);

    setInput("");
  };

  return (
    <div className="chat-assistant-wrapper">
      <button className="chat-toggle" onClick={() => setVisible(!visible)}>Robot Assistant</button>

      {visible && (
        <div className="chat-box">
          <div className="chat-header">Smart Build Assistant</div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
