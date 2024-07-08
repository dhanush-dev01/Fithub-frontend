import React, { useState } from 'react';
import styles from './Styles/userPage_rightcontainer.module.css';
import Dashboard from './rightcontainer/dashboard';
import Maps from './rightcontainer/maps';
import History from './rightcontainer/history';
import UserCommunity from '../IntegratedCommunityPage/LeaderCommunityPage/LeaderCommunity';
import ProfilePage from '../Profile Page/ProfilePageMain';
import UserCommunityPage from '../IntegratedCommunityPage/UserCommunityPage/UserCommunityPage';
import CartPageMain from '../CartPage/CartPageMain';
import UploadProducts from '../IntegratedCommunityPage/LeaderCommunityPage/UploadProducts';



const UserPage_rightcontainer = ({ selectedItem }) => {
  const userType = localStorage.getItem('userType');

  const renderComponent = () => {
    switch (selectedItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'maps':
        return <Maps />;
      case 'history':
        return <History />;
      case 'community':
        if (userType === 'cust-leader') {
          return <UserCommunity />;
        } else if (userType === 'cust-normal') {
          return <UserCommunityPage />;
        } else {
          return <Dashboard />; 
        }
      case 'profile':
        return <ProfilePage />;
      case 'community':
        return <UserCommunityPage />;
      case 'product':
        if (userType === 'cust-leader') {
          return <UploadProducts/>
        }
        else{
        return <CartPageMain/>
        }

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`${styles.right_Main_container}`} style={{ overflow: selectedItem == "product" && "scroll"}} >
      {renderComponent()}
    </div>
  );
};

export default UserPage_rightcontainer;
