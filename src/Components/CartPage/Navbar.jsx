import React from 'react';
import { ReactComponent as CartIcon } from '../../cart-icon.svg';
import logo from '../../assets/Images/Logo-Light.png';

function Navbar({ cartItems, setIsCartOpen }) {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="joggersCartNavbar">
      <div className="logo">
          <a href="/"><img src={logo} alt="Logo" className="headerlogo"/></a>
        </div>
      <div className="cart-container" onClick={() => setIsCartOpen(true)}>
        <CartIcon className="cart-icon" />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
