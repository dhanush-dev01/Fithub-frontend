import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserCommunityPage() {
  const [isInCommunity, setIsInCommunity] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityLeader, setCommunityLeader] = useState(null);

  useEffect(() => {
    const fetchCommunityStatus = async () => {
      try {
        const storedCustomerId = localStorage.getItem('customerId');
        if (storedCustomerId) {
          setCustomerId(storedCustomerId);

          const response = await axios.get('http://localhost:8080/customer/getCommunity', {
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
        const response = await axios.get('http://localhost:8080/customobj/getCommunity');
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

  const fetchCommunityLeader = async (communityName) => {
    try {
      const response = await axios.get('http://localhost:8080/customer/getLeaderOfCommunity', {
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
      const response = await axios.post('http://localhost:8080/customer/addToCommunity', null, {
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
    <div className="container mt-5">
      {isInCommunity ? (
        <div>
          <h3>Welcome to your Community Page!</h3>
          <p>You are already part of the {currentCommunity} community.</p>

          {communityLeader && (
            <div>
              <h4>Community Leader:</h4>
              <p>{communityLeader.firstName} {communityLeader.lastName}</p>
            </div>
          )}

          <h4>Community Members:</h4>
          <ul className="list-group">
            {communityMembers.map((member, index) => (
              <li key={index} className="list-group-item">
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Join a Community</h3>
          <ul className="list-group">
            {communities.map((community, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {community}
                <button className="btn btn-primary" onClick={() => handleJoinCommunity(community)}>Join</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
