import React from 'react';
import styles from './Styles/profile_info.module.css';
import profileImg from '../../assets/Images/user_149071.png';

export default function Profile_info({ isCollapsed }) {
  return (
    <div className={styles.profileinfo}>
      <img src={profileImg} alt="Profile" className={styles.profileimg} />
      {!isCollapsed && <h4 className={styles.userName}>Name</h4>}
    </div>
  );
}
