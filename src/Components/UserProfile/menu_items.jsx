import React from 'react';
import styles from './Styles/menu_items.module.css';
import { FaTachometerAlt, FaMap, FaUser, FaBell, FaTable, FaFont, FaGem, FaRocket } from 'react-icons/fa';

const Menu_items = ({ isCollapsed, onMenuItemClick }) => {
  return (
    <div className={styles.menu}>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('dashboard')}>
        <FaTachometerAlt className={styles.icon} />
        {!isCollapsed && <span>Dashboard</span>}
      </a>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('maps')}>
        <FaMap className={styles.icon} />
        {!isCollapsed && <span>Maps</span>}
      </a>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('history')}>
        <FaGem className={styles.icon} />
        {!isCollapsed && <span>Activity History</span>}
      </a>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('community')}>
        <FaBell className={styles.icon} />
        {!isCollapsed && <span>Community</span>}
      </a>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('profile')}>
        <FaUser className={styles.icon} />
        {!isCollapsed && <span>User Profile</span>}
      </a>
      <a  className={styles.menuItem} onClick={() => onMenuItemClick('product')}>
        <FaTable className={styles.icon} />
        {!isCollapsed && <span>Product List</span>}
      </a>
    </div>
  );
};

export default Menu_items;
