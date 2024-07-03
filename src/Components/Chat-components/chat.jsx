import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ username, community }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (community && username) {
      socket.emit('joinCommunity', community, username);
    }

    socket.on('message', (msg) => {
      console.log('Message received:', msg); // Debug log
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [community, username]);

  const sendMessage = () => {
    if (message) {
      const msgObject = { username, text: message };
      console.log('Sending message:', msgObject); // Debug log
      socket.emit('message', community, msgObject);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Community: {community}</h2>
      <div>
        <input 
          type="text" 
          placeholder="Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
            <strong>{msg.username}</strong>: {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
