import React, { useState } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    const botMessage = { role: 'assistant', content: data.reply };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>{msg.role}: {msg.content}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Zwanski..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatAssistant;
