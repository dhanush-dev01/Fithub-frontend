import React from "react";
import "./Styles/HeaderMainComponent.css";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../../assets/Images/Logo-Light.png";
import { ReactComponent as CartIcon } from "../../cart-icon.svg";
// import logo from '../../assets/Images/Logo-Light.png';

const Header = ({ cartItems, setIsCartOpen }) => {
  const itemCount =
    cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="header">
      <nav className="navbar-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" className="headerlogo" />
          </a>
        </div>
        <div className="HeaderProfile">
          <a href="/profile">
            <AiOutlineUser size={40} className="navIcons" />
          </a>
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
