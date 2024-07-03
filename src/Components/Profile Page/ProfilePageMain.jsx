import React, { useContext, useEffect, useState } from 'react';
import './Styles/ProfilePageMain.css';
import { FaUserCircle, FaShoppingCart, FaUsers, FaListAlt, FaUserFriends } from 'react-icons/fa';
import defaultProfileImg from '../../assets/Images/user_149071.png';
import character1 from '../../assets/Images/character1.jpg';
import character2 from '../../assets/Images/character2.jpg';
import character3 from '../../assets/Images/character3.jpg';
import character4 from '../../assets/Images/character4.jpg';
import character5 from '../../assets/Images/character5.jpg';
import character6 from '../../assets/Images/character6.jpg';
import character7 from '../../assets/Images/character7.jpg';
import character8 from '../../assets/Images/character8.jpg';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../ChatModule/firebase';

export default function ProfilePage() {

  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    getChats();
  },[currentUser.uid]);
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [profileImg, setProfileImg] = useState(defaultProfileImg);

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
      <div className="NamePlusBio"><h2 className="userName">Name</h2>
      <p className="userBio">This is a short bio about the user.</p></div>
        <div className="ProfilePagecard friendSection">
          <div className="iconPlusName ">
            <FaUserFriends className="ProfilePagecardIcon" />
            <h3>Friends</h3>
          </div>
          <p>{chats && Object.entries(chats).length}</p>
        </div>
        <div className="ProfilePagecard cartSection">
          <div className="iconPlusName">
            <FaShoppingCart className="ProfilePagecardIcon" />
            <h3>Cart</h3>
          </div>
          <p>3 items</p>
        </div>
        <div className="communityPlusActvity">
        <div className="ProfilePagecard communitySection">
          <div className="iconPlusName">
            <FaUsers className="ProfilePagecardIcon" />
            <h3>Community</h3>
          </div>
          <p>Valtech Community</p>
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
