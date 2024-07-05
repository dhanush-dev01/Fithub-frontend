import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Styles/leaderCommunity.css';
import logo from '../../../assets/Images/Joggingppl.jpg';

import ChatHome from '../../ChatModule/ChatHome';
import UploadProducts from './UploadProducts'; // Imported UploadProducts component
import { FaCommentDots } from 'react-icons/fa';
import { setDoc, doc, serverTimestamp, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

import { db } from '../../ChatModule/firebase';
import { AuthContext } from '../../context/AuthContext';

export default function LeaderCommunity({ leaderId }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [address, setAddress] = useState('');
  const [agenda, setAgenda] = useState('');
  const [location, setLocation] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [communities, setCommunities] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const [isUploadActive, setIsUploadActive] = useState(false); // State for upload visibility
  const [communityMembers, setCommunityMembers] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/customobj/getCommunity?leaderId=${leaderId}`);
      const filteredCommunities = response.data.filter((community, index) => index >= 3);
      setCommunities(filteredCommunities);

      // Fetch members for the first community in the list if available
      if (filteredCommunities.length > 0) {
        fetchCommunityMembers(filteredCommunities[0].name);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const fetchCommunityMembers = async (communityName) => {
    try {
      const response = await axios.get('http://localhost:8080/customer/getCustomersByCommunity', {
        params: {
          communityName,
        },
      });

      console.log("Community members response: ", response.data);
      setCommunityMembers(response.data);
    } catch (error) {
      console.error('Error fetching community members:', error);
    }
  };

  const handleCreateCommunityClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate community name for spaces
    if (communityName.includes(' ')) {
      setError('Community name cannot contain spaces.');
      return;
    }

    const newCommunity = { name: communityName, address, agenda, location, iconUrl };

    try {
      const response = await axios.post('http://localhost:8080/customobj/addCommunity', newCommunity);
      if (response.status === 200) {
        setCommunities([...communities, response.data]);
        setCommunityName('');
        setAddress('');
        setAgenda('');
        setLocation('');
        setIconUrl('');
        setIsFormVisible(false);
        fetchCommunityMembers(response.data.name); 
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error creating community:', error);
      setError('Failed to create community. Please try again.');
    }

    setCommunityName('');
    setLocation('');
    setIsFormVisible(false);
  };

  const handleDeleteCommunity = async (communityName) => {
    try {
      const response = await axios.delete(`http://localhost:8080/customobj/removeCommunity?community=${encodeURIComponent(communityName)}`);
      if (response.status === 200) {
        setCommunities(communities.filter(community => community.name !== communityName));
      } else {
        console.error('Failed to delete community:', response.data);
      }
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  const toggleChat = () => {
    setIsChatActive(!isChatActive);
    setIsUploadActive(false); // Ensure upload is inactive when chat is active
  };

  const toggleUpload = () => {
    setIsUploadActive(!isUploadActive);
    setIsChatActive(false); // Ensure chat is inactive when upload is active
  };

  return (
    <div className="leader-community-container">
      <h1 className='styledHeading'>Your Community!</h1>

      <div className="CommunityPlusCommunityMembers">
        {!isFormVisible && communities.length === 0 && (
          <button className="create-Community-button" onClick={handleCreateCommunityClick}>
            Create
          </button>
        )}
        {!isChatActive && !isUploadActive && (
          <>
            <div className="community-list">
              {communities.map((community, index) => (
                <div key={index} className="community-item">
                  <div>
                    <div className="imagePlusButtons">
                      <img src={logo} alt="Logo" className="headerlogo" />
                      <div className="community-actions">
                        <button className="upload-items-button" onClick={toggleUpload}>
                          Upload 
                        </button>
                        
                        <button className="chat-with-community-button" onClick={toggleChat}>
                          Chat with us
                        </button>
                        <button onClick={() => handleDeleteCommunity(community.name)} className="delete-Community-button">
                          Delete 
                        </button>
                      </div>
                    </div>
            
                    <span className="community-name">{community.name} Community</span>
                    <br />
                    <span className="community-address">{community.address}</span>
                    <br />
                    <span className="community-agenda">{community.agenda}</span>
                  </div>
                  
                </div>
              ))}
            </div>
            {isFormVisible && (
              <form onSubmit={handleFormSubmit} className="community-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    placeholder="Enter community name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    placeholder="Enter agenda"
                    required
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-Community-button">Create</button>
              </form>
            )}
          </>
        )}
        {isChatActive && (
          <div className="chat-home-container">
            <ChatHome />
          </div>
        )}
        {isUploadActive && (
          <div className="upload-products-container">
            <UploadProducts />
          </div>
        )}
        {communities.length > 0 && (
          <div className="community-members-container">
            <h4 className='styledHeading'>Community Members</h4>
            <ul className="list-group">
              {communityMembers.map((member, index) => (
                <li key={index} className="list-group-item">
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
