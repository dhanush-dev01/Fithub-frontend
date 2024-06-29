import React, { useState } from 'react';
import Cart from './Cart';
import ProductListingPageMain from '../ProductListingPage/ProductListingPageMain';
import Navbar from './Navbar'; // Assuming you want to use the same Navbar
import Header from '../Header/HeaderMainComponent';

function CartPageMain() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      {/* <Navbar cartItems={cartItems} setIsCartOpen={setIsCartOpen} /> */}
      <Header cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <ProductListingPageMain addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
      />
    </div>
  )
}

export default CartPageMain;
