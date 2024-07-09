import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Styles/leaderCommunity.css';
import logo from '../../../assets/Images/Joggingppl.jpg';
import ChatHome from '../../ChatModule/ChatHome';
import UploadProducts from './UploadProducts';
import { AuthContext } from '../../context/AuthContext';

export default function LeaderCommunity() {
  const [showForm, setShowForm] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAgenda, setNewAgenda] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newIconUrl, setNewIconUrl] = useState('');
  const [communityList, setCommunityList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [formError, setFormError] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadCommunityMembers();
    }
  }, [currentUser]);

  const loadCommunities = async () => {
  };

  const loadCommunityMembers = async () => {
    try {
      const response = await axios.get(`https://machjava.azurewebsites.net/customer/getCommunity`, {
        params: { customerid: localStorage.getItem("customerId") },
      });

      if (response.status === 200) {
        const communityName = response.data;
        setNewCommunityName(communityName);

        const membersResponse = await axios.get('https://machjava.azurewebsites.net/customer/getCustomersByCommunity', {
          params: { communityName },
        });

        if (membersResponse.status === 200) {
          setMembersList(membersResponse.data);

          const communitiesResponse = await axios.get('https://machjava.azurewebsites.net/customobj/getCommunity');
          const myCommunity = communitiesResponse.data.filter(community => community.name === communityName);
          setCommunityList(myCommunity);
        }
      }
    } catch (error) {
      console.error('Error fetching community members:', error);
    }
  };

  const handleCreateCommunityClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newCommunityName.includes(' ')) {
      setFormError('Community name cannot contain spaces.');
      return;
    }

    const newCommunity = { name: newCommunityName, address: newAddress, agenda: newAgenda, location: newLocation, iconUrl: newIconUrl };

    try {
      const response = await axios.post('https://machjava.azurewebsites.net/customobj/addCommunity', newCommunity, {
        params: { customerid: localStorage.getItem("customerId") },
      });

      if (response.status === 200) {
        setCommunityList([...communityList, response.data]);
        resetForm();
        loadCommunityMembers(); 
      }
    } catch (error) {
      console.error('Error creating community:', error);
      setFormError('Failed to create community. Please try again.');
    }
  };

  const handleDeleteCommunity = async (communityName) => {
    try {
      const response = await axios.delete(`https://machjava.azurewebsites.net/customobj/removeCommunity?community=${encodeURIComponent(communityName)}`);
      if (response.status === 200) {
        setCommunityList(communityList.filter(community => community.name !== communityName));
      }
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  const resetForm = () => {
    setNewCommunityName('');
    setNewAddress('');
    setNewAgenda('');
    setNewLocation('');
    setNewIconUrl('');
    setShowForm(false);
    setFormError('');
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
    setUploadVisible(false);
  };

  const toggleUpload = () => {
    setUploadVisible(!uploadVisible);
    setChatVisible(false);
  };

  return (
    <div className="leader-community-container">
      <h1 className='styledHeading'>Your Community!</h1>
      <div className="CommunityPlusCommunityMembers">
        {!showForm && communityList.length === 0 && (
          <button className="create-Community-button" onClick={handleCreateCommunityClick}>
            Create
          </button>
        )}
        {!chatVisible && !uploadVisible && (
          <>
            <div className="community-list">
              {communityList.map((community, index) => (
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
            {showForm && (
              <form onSubmit={handleFormSubmit} className="community-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                    placeholder="Enter community name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={newAgenda}
                    onChange={(e) => setNewAgenda(e.target.value)}
                    placeholder="Enter agenda"
                    required
                  />
                </div>
                {formError && <p className="error-message">{formError}</p>}
                <button type="submit" className="submit-Community-button">Create</button>
              </form>
            )}
          </>
        )}
        {chatVisible && (
          <div className="chat-home-container">
            <ChatHome />
          </div>
        )}
        {uploadVisible && (
          <div className="upload-products-container">
            <UploadProducts />
          </div>
        )}
        {communityList.length > 0 && (
          <div className="community-members-container">
            <h4 className='styledHeading'>Community Members</h4>
            <ul className="list-group">
              {membersList.map((member, index) => (
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
