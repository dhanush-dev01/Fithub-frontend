import React from 'react';
import styles from './Styles/userPage_leftcontainer.module.css';
import Menu_items from './menu_items';

const UserPage_leftcontainer = ({ isCollapsed, toggleCollapse,onMenuItemClick  }) => {
  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggleButton} onClick={toggleCollapse}>
        {isCollapsed ? '>' : '<'}
      </button>
      <Menu_items isCollapsed={isCollapsed} onMenuItemClick={onMenuItemClick} />
    </div>
  );
};

export default UserPage_leftcontainer;
