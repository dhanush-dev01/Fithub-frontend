import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/UCommunity.css'; // Import custom CSS file
import ChatHome from '../../ChatModule/ChatHome';

export default function UserCommunityPage() {
  const [isInCommunity, setIsInCommunity] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityLeader, setCommunityLeader] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const fetchCommunityStatus = async () => {
      try {
        const storedCustomerId = localStorage.getItem('customerId');
        if (storedCustomerId) {
          setCustomerId(storedCustomerId);

          const response = await axios.get('https://machjava.azurewebsites.net/customer/getCommunity', {
            params: {
              customerid: storedCustomerId,
            },
          });

          console.log("Community status response: ", response.data);
          localStorage.setItem("communityname", response.data);

          if (response.data !== "Community not found") {
            setCurrentCommunity(response.data);
            setIsInCommunity(true);
            fetchCommunityMembers(response.data);
            fetchCommunityLeader(response.data);
          } else {
            fetchAvailableCommunities();
          }
        } else {
          console.error('No customerId found in localStorage.');
        }
      } catch (error) {
        console.error('Error checking community status:', error);
      }
    };

    const fetchAvailableCommunities = async () => {
      try {
        const response = await axios.get('https://machjava.azurewebsites.net/customobj/getCommunity');
        console.log("Available communities response: ", response.data);

        const availableCommunities = response.data.map(community => community.name);
        setCommunities(availableCommunities);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunityStatus();
  }, []);

  const fetchCommunityMembers = async (communityName) => {
    try {
      const response = await axios.get('https://machjava.azurewebsites.net/customer/getCustomersByCommunity', {
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
  const toggleChat = () => {
    setIsChatActive(!isChatActive);
  };


  const fetchCommunityLeader = async (communityName) => {
    try {
      const response = await axios.get('https://machjava.azurewebsites.net/customer/getLeaderOfCommunity', {
        params: {
          communityName,
        },
      });

      console.log("Community leader response: ", response.data);
      setCommunityLeader(response.data);
    } catch (error) {
      console.error('Error fetching community leader:', error);
    }
  };

  const handleJoinCommunity = async (community) => {
    try {
      const response = await axios.post('https://machjava.azurewebsites.net/customer/addToCommunity', null, {
        params: {
          community: community,
          customerid: customerId,
        },
      });

      console.log(`Joined ${community}:`, response.data);
      setIsInCommunity(true);
      setCurrentCommunity(community);
      fetchCommunityMembers(community);
      fetchCommunityLeader(community);
    } catch (error) {
      console.error(`Error joining ${community}:`, error);
    }
  };

  return (
    <div className="user-Community-Container">
      {isInCommunity ? (
        <div>

            <h3 className="community-header styledHeading">Welcome to your Community Page!</h3>
            <p className="community-status styledHeading">You are already part of the  <span className="bold-large"> {currentCommunity} </span>community.</p>

        <div className="community-and-chat">
        <div className="chat-home-container">
            <ChatHome />
          </div>
          <div className="community-members-container">
          
            {communityLeader && (
              <div>
                <h4 className="styledHeading">Community Leader</h4>
                <p className="bold-large">{communityLeader.firstName} {communityLeader.lastName}</p>
              </div>
            )}
            <h4 className="community-members styledHeading">Community Members</h4>
            <ul className="community-members-list">
              {communityMembers.map((member, index) => (
                <li key={index} className="community-member-item">
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </ul>
          </div>
          


        </div>
        </div>
      ) : (
        <div>
          <h3 className="community-header">Join a Community</h3>
          <ul className="list-group">
            {communities.map((community, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {community}
                <button className="join-community-btn" onClick={() => handleJoinCommunity(community)}>Join</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
