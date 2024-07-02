import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserCommunityPage() {
  const [isInCommunity, setIsInCommunity] = useState();
  const [communities, setCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState('');
  const [customerId, setCustomerId] = useState('');

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

          if (response.data != "Community not found") {
            setCurrentCommunity(response.data);
            setIsInCommunity(true);
          } else {
            fetchAvailableCommunities(storedCustomerId);
          }
        } else {
          console.error('No customerId found in localStorage.');
        }
      } catch (error) {
        console.error('Error checking community status:', error);
      }
    };

    const fetchAvailableCommunities = async (customerId) => {
      try {
        const response = await axios.post('http://localhost:8080/customer/addToCommunity', null, {
          params: {
            customerid: customerId,
            community: 'we', 
          },
        });

        console.log("Available communities response: ", response.data);

        const availableCommunities = extractCommunities(response.data);
        setCommunities(availableCommunities);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunityStatus();
  }, []);

  const extractCommunities = (responseString) => {
    const match = responseString.match(/Available communities are \[(.+?)\]/);
    if (match) {
      return match[1].split(', ').map(community => community.trim());
    }
    return [];
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
