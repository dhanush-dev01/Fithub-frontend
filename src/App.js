import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPageMain from "./Components/CartPage/CartPageMain";
import LandingPageMain from "./Components/Landing page/LandingPageMain";
import ProductListingPageMain from "./Components/ProductListingPage/ProductListingPageMain";
import ProfilePageMain from "./Components/Profile Page/ProfilePageMain";
import Login from './Components/Loginpage/login';
import Header from './Components/Header/HeaderMainComponent';
import AboutUs from './Components/AboutUsPage/AboutUs';
import "./common.css"
import Chat from './Components/Chat-components/chat';
import ChatLogin from './Components/Chat-components/ChatLogin';

function App() {
  const [username, setUsername] = useState('');
  const [community, setCommunity] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<ProfilePageMain />} />
          <Route path="/products" element={<ProductListingPageMain />} />
          <Route path="/cart" element={<CartPageMain />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPageMain />} />
         

        </Routes>
      </div>
    </Router>
  );
}

export default App;