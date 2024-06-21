import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatLogin = ({ setUsername, setCommunity }) => {
  const [tempUsername, setTempUsername] = useState('');
  const [tempCommunity, setTempCommunity] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (tempUsername && tempCommunity) {
      setUsername(tempUsername);
      setCommunity(tempCommunity);
      navigate('/chat');
    }
  };

  return (
    <div>
      <h2>Join a Community</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={tempUsername} 
        onChange={(e) => setTempUsername(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Community" 
        value={tempCommunity} 
        onChange={(e) => setTempCommunity(e.target.value)} 
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default ChatLogin;
