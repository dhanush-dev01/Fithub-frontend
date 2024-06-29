import React, { useState } from 'react';
import styles from './Styles/userPage_rightcontainer.module.css';
import Dashboard from './rightcontainer/dashboard';
import Maps from './rightcontainer/maps';
import History from './rightcontainer/history';
import UserCommunity from '../IntegratedCommunityPage/LeaderCommunityPage/LeaderCommunity';
import ProfilePage from '../Profile Page/ProfilePageMain';



const UserPage_rightcontainer = ({ selectedItem }) => {
  const renderComponent = () => {
    switch (selectedItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'maps':
        return <Maps />;
      case 'history':
        return <History />;
      case 'community':
        return <UserCommunity />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.right_Main_container}>
      {renderComponent()}
    </div>
  );
};

export default UserPage_rightcontainer;
