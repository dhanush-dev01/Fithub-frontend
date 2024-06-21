import React from 'react';
import { ReactComponent as CartIcon } from '../cart-icon.svg';

function Navbar({ cartItems, setIsCartOpen }) {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <h1>JogHub Store</h1>
      <div className="cart-container" onClick={() => setIsCartOpen(true)}>
        <CartIcon className="cart-icon" />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
