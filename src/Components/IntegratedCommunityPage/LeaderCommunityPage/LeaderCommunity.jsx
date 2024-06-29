import React, { useState } from 'react';
import './Styles/leaderCommunity.css';

export default function LeaderCommunity() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [location, setLocation] = useState('');
  const [communities, setCommunities] = useState([]);

  const handleCreateCommunityClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newCommunity = { name: communityName, location };
    setCommunities([newCommunity]); // Ensures only one community can be created
    setCommunityName('');
    setLocation('');
    setIsFormVisible(false);
  };

  const handleDeleteCommunity = () => {
    setCommunities([]);
  };

  return (
    <div className="leader-community-container">
      <h1>Create a community to get started!</h1>
      {!isFormVisible && communities.length === 0 && (
        <button className="create-Community-button" onClick={handleCreateCommunityClick}>
          Create
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="community-form">
          <div className="form-group">
            <label>Community Name:</label>
            <input
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-Community-button">Create</button>
        </form>
      )}
      <div className="community-list">
        {communities.map((community, index) => (
          <div key={index} className="community-item">
            <div>
              <span className="community-name">{community.name}</span>
              <br />
              <span className="community-location">{community.location}</span>
            </div>
            <div>
              <button onClick={handleDeleteCommunity} className="delete-Community-button">
                Delete 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
