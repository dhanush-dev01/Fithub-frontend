import React, { useState } from 'react';
import styles from './Styles/menu_items.module.css';
import { FaTachometerAlt, FaMap, FaUser, FaBell, FaTable, FaGem, FaUserCircle } from 'react-icons/fa';

const Menu_items = ({ isCollapsed, onMenuItemClick }) => {
  const [selectedItem, setSelectedItem] = useState('dashboard'); 

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    onMenuItemClick(item);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.profileItem} onClick={() => handleMenuItemClick('profile')}>
        <FaUserCircle className={styles.profileIcon} />
        {!isCollapsed && <span className={styles.profileName}>User Name</span>}
      </div>
      <a
        className={`${styles.menuItem} ${selectedItem === 'dashboard' ? styles.selected : ''}`}
        onClick={() => handleMenuItemClick('dashboard')}
      >
        <FaTachometerAlt className={styles.icon} />
        {!isCollapsed && <span>Dashboard</span>}
      </a>
      <a
        className={`${styles.menuItem} ${selectedItem === 'maps' ? styles.selected : ''}`}
        onClick={() => handleMenuItemClick('maps')}
      >
        <FaMap className={styles.icon} />
        {!isCollapsed && <span>Maps</span>}
      </a>
      <a
        className={`${styles.menuItem} ${selectedItem === 'history' ? styles.selected : ''}`}
        onClick={() => handleMenuItemClick('history')}
      >
        <FaGem className={styles.icon} />
        {!isCollapsed && <span>Activity History</span>}
      </a>
      <a
        className={`${styles.menuItem} ${selectedItem === 'community' ? styles.selected : ''}`}
        onClick={() => handleMenuItemClick('community')}
      >
        <FaBell className={styles.icon} />
        {!isCollapsed && <span>Community</span>}
      </a>
      <a
        className={`${styles.menuItem} ${selectedItem === 'product' ? styles.selected : ''}`}
        onClick={() => handleMenuItemClick('product')}
      >
        <FaTable className={styles.icon} />
        {!isCollapsed && <span>Product List</span>}
      </a>
    </div>
  );
};

export default Menu_items;
