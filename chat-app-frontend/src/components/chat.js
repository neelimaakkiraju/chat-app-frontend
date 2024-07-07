import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL);

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const sessionMessages = localStorage.getItem('messages');
    if (sessionMessages) {
      setMessages(JSON.parse(sessionMessages));
    }

    socket.on('message', (msg) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, msg];
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
