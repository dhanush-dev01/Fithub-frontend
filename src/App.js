import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPageMain from "./Components/CartPage/CartPageMain";
import LandingPageMain from "./Components/Landing page/LandingPageMain";
import ProductListingPageMain from "./Components/ProductListingPage/ProductListingPageMain";
import ProfilePageMain from "./Components/Profile Page/ProfilePageMain";
// import Login from './Components/Loginpage/login';
import Header from './Components/Header/HeaderMainComponent';
import AboutUs from './Components/AboutUsPage/AboutUs';
import JoggingLoader from './Components/JoggingLoader/JoggingLoader';
import "./common.css"
import Footer from './Components/Footer/FooterMain';
import UserPageMain from './Components/UserProfile/userPage';
import Chat from './Components/Chat-components/chat';
import ChatLogin from './Components/Chat-components/ChatLogin';
import ChatLeader from './Components/chatdashboard_leader/chatleader';

function App() {
  const [loading, setLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <JoggingLoader />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/profile" element={<ProfilePageMain />} />
              <Route path="/products" element={<ProductListingPageMain />} />
              <Route path="/cart" element={<CartPageMain />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/user" element={<UserPageMain/>} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={<LandingPageMain />} />
            </Routes>
            {showFooter && <Footer />}
          </>
        )}
        <Routes>
          <Route path="/profile" element={<ProfilePageMain />} />
          <Route path="/products" element={<ProductListingPageMain />} />
          <Route path="/cart" element={<CartPageMain />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatleader" element={<ChatLeader />} />
          <Route path="/" element={<LandingPageMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
