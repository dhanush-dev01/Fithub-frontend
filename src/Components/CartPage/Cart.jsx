import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import './styles/cartStyles.css';
import { useLocation } from 'react-router-dom';

function Cart({ cartItems, setIsCartOpen, updateQuantity, removeFromCart, isOpen }) {
  const [coupon, setCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponName, setCouponName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();

  const handleSessionCheck = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:8000/stripe-session/${sessionId}`);
      const sessionData = await response.json();
      if (sessionData.payment_status !== 'paid') {
        await fetch('http://localhost:8000/revert-voucher', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coupon: couponName,
          }),
        });
      }
    } catch (error) {
      console.error('Error checking session status:', error);
    }
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  const applyCoupon = async () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await fetch('http://localhost:8000/voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coupon,
          amount: total,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setDiscountAmount(data.discountAmount);
        setCouponName(data.couponName);
        setSuccessMessage('Successfully redeemed');
        setError('');
      } else {
        setDiscountAmount(0);
        setCouponName('');
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setDiscountAmount(0);
      setCouponName('');
      setError('Failed to redeem coupon');
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setCoupon('');
    setDiscountAmount(0);
    setCouponName('');
    setSuccessMessage('');
    setError('');
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = total - discountAmount;
  const tax = discountedTotal * 0.03;
  const finalTotal = discountedTotal + tax;

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/cart-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: finalTotal,
          couponName, // Send the coupon name to the server
          discountAmount, // Send the discount amount to the server
        }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Payment error');
    }
  };

  const formatPrice = (price) => {
    const [integerPart, decimalPart] = price.toFixed(2).split('.');
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formattedInteger + '.' + decimalPart;
  };

  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={() => setIsCartOpen(false)}>×</button>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          <div className="coupon-field">
            <input
              type="text"
              placeholder="Have a Coupon?"
              value={coupon}
              onChange={handleCouponChange}
              disabled={loading || couponName}
            />
            <button onClick={applyCoupon} disabled={loading || couponName}>
              {loading ? 'Applying...' : 'Apply'}
            </button>
            {couponName && (
              <button className="remove-coupon-button" onClick={removeCoupon}>
                ×
              </button>
            )}
          </div>
          {loading && <p className="loader">Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="cart-total">
            <h3>Total: ₹{formatPrice(total)}</h3>
            {discountAmount > 0 && (
              <p>
                Discount ({couponName}): -₹{formatPrice(discountAmount)}
              </p>
            )}
            <p>Tax (3%): ₹{formatPrice(tax)}</p>
            <h3>Final Total: ₹{formatPrice(finalTotal)}</h3>
          </div>
          <button className="make-payment-button" onClick={handlePayment}>Make Payment</button>
        </>
      )}
    </div>
  );
}

export default Cart;
