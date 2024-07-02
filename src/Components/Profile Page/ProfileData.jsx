import React, { useState } from 'react';
import axios from 'axios';
import "./Styles/profiledata.css"

const ProfileData = ({ onUpdateProfile, onClose }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerID = localStorage.getItem('customerId');
  
    try {
      const response = await axios.post('http://localhost:8080/customer/updateCustomerDetails', {
        age: formData.age.toString(),
        weight: formData.weight.toString(),
        height: formData.height.toString(),
        gender: formData.gender.toString()
      }, {
        params: {
          customerid: customerID
        }
      });
      console.log('Update successful:', response.data);
      onUpdateProfile(formData);
    } catch (error) {
      console.error('Error updating customer details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
     
    }
  };
  

  return (
    <div className="overlay">
      <div className="popup">
        <button className="closeButton" onClick={onClose}>×</button>
        <h2>Update Customer Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Height:
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <button type="submit">Update Details</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileData;
