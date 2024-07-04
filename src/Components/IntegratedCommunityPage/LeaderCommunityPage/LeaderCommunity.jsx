import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Styles/leaderCommunity.css';
import logo from '../../../assets/Images/Joggingppl.jpg';

import ChatHome from '../../ChatModule/ChatHome';
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

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/customobj/getCommunity?leaderId=${leaderId}`);
      const filteredCommunities = response.data.filter((community, index) => index >= 3);
      setCommunities(filteredCommunities);
    } catch (error) {
      console.error('Error fetching communities:', error);
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
        window.location.reload(); // Consider better state management or refetching instead of full reload
      }
    } catch (error) {
      console.error('Error creating community:', error);
      setError('Failed to create community. Please try again.');
    }
    
    // const groupId = communityName
    // console.log(groupId);
    // const groupData = {
    //   groupId,
    //   groupName: communityName,
    //   // users: arrayUnion({
    //   //   uid: currentUser.uid,
    //   //   displayName: currentUser.displayName,
    //   // }),
    //   messages: [],
    //   date: serverTimestamp(),
    // };

    // const groupChatRef = doc(db, "chats", groupId);
    // // const groupChatSnapshot = await getDoc(groupChatRef);

    // // if (groupChatSnapshot.exists()) {
    // //   // Update existing group chat
    // //   await updateDoc(groupChatRef, {
    // //     users: arrayUnion({
    // //       uid: currentUser.uid,
    // //       displayName: currentUser.displayName,
    // //     }),
    // //   });
    // // } else {
    //   // Create a new group chat
    //   await setDoc(groupChatRef, groupData);
    // // }

    // // Update userChats collection for the new user
    // // await updateDoc(doc(db, "userChats", currentUser.uid), {
    // //   [groupId]: {
    // //     groupId,
    // //     groupName: communityName,
    // //     date: serverTimestamp(),
    // //   },
    // // });

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
  };

  return (
    <div className="leader-community-container">
      <h1 className='styledHeading'>Your Community!</h1>
      {!isChatActive && !isFormVisible && communities.length === 0 && (
      <h1>Create a community to get started!</h1>
      {/* {console.log(currentUser.displayName)} */}
      {!isFormVisible && communities.length === 0 && (
        <button className="create-Community-button" onClick={handleCreateCommunityClick}>
          Create
        </button>
      )}
      {!isChatActive && (
        <>
          <div className="community-list">
            {communities.map((community, index) => (
              <div key={index} className="community-item">
                <div>
                  <img src={logo} alt="Logo" className="headerlogo" />
                  <span className="community-chat-icon" onClick={toggleChat}><FaCommentDots /></span>
                  <br />
                  <span className="community-name">{community.name}</span>
                  <br />
                  <span className="community-address">{community.address}</span>
                  <br />
                  <span className="community-agenda">{community.agenda}</span>
                  {/* <br /> */}
                  {/* <span className="community-location">{community.location}</span> */}
                </div>
                <div>
                  <button onClick={() => handleDeleteCommunity(community.name)} className="delete-Community-button">
                    Delete
                  </button>
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
              {/* <div className="form-group">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </div> */}
              {/* <div className="form-group">
                <input
                  type="text"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="Enter icon URL"
                  required
                />
              </div> */}
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
    </div>
  );
}
