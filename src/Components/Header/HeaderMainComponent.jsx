import React from 'react';
import './Styles/HeaderMainComponent.css';
import logo from '../../assets/Images/Logo-Light.png';

const Header = ({ isLandingPage }) => {
  return (
    <header className="header">
      <nav className="navbar-container">
        <div className="logo">
          <a href="/"><img src={logo} alt="Logo" className="headerlogo" /></a>
        </div>
        <div className="HeaderProfile">
          {isLandingPage ? (
            <button>Login</button>
          ) : (
            <button>Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
