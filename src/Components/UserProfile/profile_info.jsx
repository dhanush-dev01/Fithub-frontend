import React from 'react';
import styles from './Styles/profile_info.module.css';

export default function Profile_info({ isCollapsed, profileImg }) {
  return (
    <div className={styles.profileinfo}>
      <img src={profileImg} alt="Profile" className={styles.profileimg} />
      {!isCollapsed && <h4 className={styles.userName}></h4>}
    </div>
  );
}
