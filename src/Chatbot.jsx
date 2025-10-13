import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ position: "fixed", bottom: 20, right: 20, width: 300, background: "#f0f0f0", padding: 10, borderRadius: 10 }}>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <p><b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage} style={{ width: "18%" }}>Send</button>
    </div>
  );
};

export default Chatbot;
