import React, { useContext, useState } from 'react';
import './Styles/leaderCommunity.css';
import { setDoc, doc, serverTimestamp, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../ChatModule/firebase';

export default function LeaderCommunity() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [location, setLocation] = useState('');
  const [communities, setCommunities] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleCreateCommunityClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newCommunity = { name: communityName, location };
    setCommunities([newCommunity]); // Ensures only one community can be created
    
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

  const handleDeleteCommunity = () => {
    setCommunities([]);
  };

  return (
    <div className="leader-community-container">
      <h1>Create a community to get started!</h1>
      {/* {console.log(currentUser.displayName)} */}
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
