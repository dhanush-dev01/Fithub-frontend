import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles/receiptStyles.css'; // Create and use a separate CSS file for styling

function Receipt() {
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
        fetchPaymentDetails(sessionId);
    }
  }, [location.search]);

  const fetchPaymentDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/payment-details/${id}`);
      const data = await response.json();
      console.log(data);
      setPaymentDetails(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to retrieve payment details');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const { amount_total, currency, line_items, metadata } = paymentDetails;
  const discount = metadata 

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h2>Payment Successful</h2>
        <p>Thank you for your purchase! Here is your receipt:</p>
      </div>
      <div className="receipt-details">
        <p><strong>Amount Paid:</strong> ₹ {amount_total / 100}</p>
        {discount.couponName && (
          <p><strong>Discount Applied:</strong> {discount.couponName}</p>
        )}
        <p><strong>Items Purchased:</strong></p>
        <ul>
          {line_items.data.map((item) => (
            <li key={item.id}>
              <div className="item-description">
                <img src={item.price.product.images[0]} alt={item.description} className="item-image" />
                <div>
                  <p>{item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹ {item.amount_subtotal / 100}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="receipt-footer">
        <button className="print-button" onClick={() => window.print()}>Print Receipt</button>
        <Link to="/" className="home-button">Go to Home</Link>
      </div>
    </div>
  );
}

export default Receipt;
