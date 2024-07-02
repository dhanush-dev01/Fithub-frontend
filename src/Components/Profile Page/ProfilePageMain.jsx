import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/ProfilePageMain.css';
import { FaUserCircle,  FaUsers, FaListAlt, FaUserFriends } from 'react-icons/fa';
import defaultProfileImg from '../../assets/Images/user_149071.png';
import character1 from '../../assets/Images/character1.jpg';
import character2 from '../../assets/Images/character2.jpg';
import character3 from '../../assets/Images/character3.jpg';
import character4 from '../../assets/Images/character4.jpg';
import character5 from '../../assets/Images/character5.jpg';
import character6 from '../../assets/Images/character6.jpg';
import character7 from '../../assets/Images/character7.jpg';
import character8 from '../../assets/Images/character8.jpg';
import ProfileData from './ProfileData'; 
export default function ProfilePage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [profileImg, setProfileImg] = useState(defaultProfileImg);
  const [userName, setUserName] = useState('');
  const [communityname, setCommunityName] = useState('');
  const [profiledata, setprofiledata] = useState('');
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchCommunityData();
  }, []);

  const fetchUserData = async () => {
    const customerID = localStorage.getItem('customerId');

    try {
      const response = await axios.get('http://localhost:8080/customer/getCustomerById', {
        params: {
          id: customerID
        }
      });
      setUserName(response.data.firstName);
      setprofiledata(response.data.custom.fields)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCommunityData = async () => {
    const customerID = localStorage.getItem('customerId'); 

    try {
      const response = await axios.get('http://localhost:8080/customer/getCommunity', {
        params: {
          customerid: customerID
        }
      });
      setCommunityName(response.data); 
    } catch (error) {
      console.error('Error fetching community data:', error);
    }
  };

  const handleImageClick = () => {
    setIsPopupVisible(true);
  };

  const handleImageSelect = (img) => {
    setProfileImg(img);
    setIsPopupVisible(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleUpdateButtonClick = () => {
    setIsUpdateFormVisible(true);
  };

  const handleUpdateProfile = async (updatedData) => {
    // Logic to update profile information in the backend
    // For example, using axios.post or axios.put

    // Assuming updating the data here
    console.log('Updated profile data:', updatedData);

    // Close the update form after submission
    setIsUpdateFormVisible(false);

    // Optionally, fetch updated data or update state directly
    // based on your application's design
  };

  return (
    <div className="profilePage">
      <div className="profileSection">
        <img
          src={profileImg}
          alt="Profile"
          className="profileIcon"
          onClick={handleImageClick}
        />
      </div>
      <div className="infoSection">
        <div className="NamePlusBio">
          <h2 className="userName">{userName}</h2>
          <p className="userBio">This is a short bio about the user.</p>
        </div>
        <div className="ProfilePagecard friendSection">
          <div className="iconPlusName ">
            <FaUserFriends className="ProfilePagecardIcon" />
            <h3>Profile Info</h3>
            <button onClick={handleUpdateButtonClick}>Update profile info</button>
          </div>
          <p>
            Age: {profiledata.age} <br />
            Weight: {profiledata.weight}<br />
            Height: {profiledata.height}<br />
            Gender: {profiledata.gender} <br />
          </p>
        </div>
        {isUpdateFormVisible && (
          <ProfileData
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setIsUpdateFormVisible(false)}
          />
        )}
        <div className="communityPlusActvity">
        <div className="ProfilePagecard cartSection">
          <div className="iconPlusName">
            <FaUserFriends className="ProfilePagecardIcon" />
            <h3>Connections</h3>
          </div>
          <p>3 </p>
        </div>
          <div className="ProfilePagecard communitySection">
            <div className="iconPlusName">
              <FaUsers className="ProfilePagecardIcon" />
              <h3>Community</h3>
            </div>
            <p>{communityname}</p>
          </div>
          <div className="ProfilePagecard ActivitySection">
            <div className="iconPlusName">
              <FaListAlt className="ProfilePagecardIcon" />
              <h3>Activities</h3>
            </div>
            <p>Graph</p>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="overlay">
          <div className="popup">
            <button className="closeButton" onClick={handleClosePopup}>×</button>
            {[character1, character5, character3, character4, character2, character6, character7, character8].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Character ${index + 1}`}
                className="popupImage"
                onClick={() => handleImageSelect(img)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
