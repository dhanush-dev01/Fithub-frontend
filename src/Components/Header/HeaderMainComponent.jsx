import React from 'react';
import './Styles/HeaderMainComponent.css';
import {AiOutlineUser} from 'react-icons/ai';
import logo from '../../assets/Images/Logo-Light.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar-container">
        <div className="logo">
          <a href="/"><img src={logo} alt="Logo" className="headerlogo" /></a>
        </div>
        <div className="HeaderProfile">
        <a href="/profile"><AiOutlineUser size={40} className="navIcons" /></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
