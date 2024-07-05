import React from 'react';
import { useLocation } from 'react-router-dom';
import './Styles/HeaderMainComponent.css';
import { AiOutlineUser } from "react-icons/ai";
import logo from '../../assets/Images/Logo-Light.png';
import { ReactComponent as CartIcon } from "../../cart-icon.svg";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../ChatModule/firebase';

const Header = ({ cartItems, setIsCartOpen, isLandingPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount =
    cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    // Implement your logout logic here
    signOut(auth)
    localStorage.clear()
    navigate("/")
  };

  // Check if the current path is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="header">
      <nav className="navbar-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" className="headerlogo" />
          </a>
        </div>
        <div className="HeaderProfile">
          {!isLoginPage && (
            <>
              {isLandingPage ? (
                <button onClick={handleLoginClick}>Login</button>
              ) : (
                <button onClick={handleLogoutClick}>Logout</button>
              )}
            </>
          )}
          {window.location.pathname === "/cart" && (
            <div className="cart-container" onClick={() => setIsCartOpen(true)}>
              <CartIcon className="cart-icon" />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
