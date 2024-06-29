import React, { useState } from 'react';
import styles from './Styles/userpage.module.css';
import UserPage_rightcontainer from './userPage_rightcontainer';
import UserPage_leftcontainer from './userPage_leftcontainer';

export default function UserPageMain() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={`${styles.userpage_Maincontainer} ${isCollapsed ? styles.collapsed : ''}`}>
      <UserPage_leftcontainer 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse} 
        onMenuItemClick={handleMenuItemClick} 
      />
      <UserPage_rightcontainer selectedItem={selectedItem} />
    </div>
  );
}
