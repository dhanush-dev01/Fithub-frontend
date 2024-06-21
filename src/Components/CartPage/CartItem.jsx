import React, { useState, useEffect } from 'react';

function CartItem({ item, updateQuantity, removeFromCart }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleRemove = () => {
    setFadeOut(true);
    setTimeout(() => {
      removeFromCart(item.id);
    }, 300); // Duration of fadeOut animation
  };

  useEffect(() => {
    if (item.quantity === 0) {
      handleRemove();
    }
  }, [item.quantity]);

  return (
    <div className={`cart-item ${fadeOut ? 'fade-out' : ''}`}>
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>₹{(item.price * item.quantity).toFixed(2)}</p>
        <div className="item-controls">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <button className="remove-button" onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default CartItem;
