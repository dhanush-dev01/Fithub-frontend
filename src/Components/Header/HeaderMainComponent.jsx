import React from 'react';
import './Styles/HeaderMainComponent.css';
import { AiOutlineUser } from "react-icons/ai";
import logo from '../../assets/Images/Logo-Light.png';
import { ReactComponent as CartIcon } from "../../cart-icon.svg";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../ChatModule/firebase';

const Header = ({cartItems, setIsCartOpen, isLandingPage }) => {
  const itemCount =
    cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const navigate = useNavigate();

    const handleSignOut = () =>{
      signOut(auth)
      localStorage.clear()
      navigate("/")
    }
  return (
    <header className="header">
      <nav className="navbar-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" className="headerlogo" />
          </a>
        </div>
        <div className="HeaderProfile">
          {isLandingPage ? (
            <button onClick={()=>navigate("/login")}>Login</button>
          ) : (
            <button onClick={handleSignOut}>Logout</button>
          )}
          {/* Jeevan jolgar please condition add madu --> Dhanush  */}
          {/* <a href="/profile">
            <AiOutlineUser size={40} className="navIcons" />
          </a> */}
          {window.location.pathname == "/cart" && <div className="cart-container" onClick={() => setIsCartOpen(true)}>
            <CartIcon className="cart-icon" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </div>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
