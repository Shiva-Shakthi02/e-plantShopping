import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chat", { messages: newMessages });
      // Add bot response
      setMessages([...newMessages, { role: "bot", text: response.data.text }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.role}`}>
            <p><b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        className="chatbot-input"
      />
      <button onClick={sendMessage} className="chatbot-button">Send</button>
    </div>
  );
};

export default Chatbot;
