import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CartPageMain from "./Components/CartPage/CartPageMain";
import LandingPageMain from "./Components/Landing page/LandingPageMain";
import ProductListingPageMain from "./Components/ProductListingPage/ProductListingPageMain";
import ProfilePageMain from "./Components/Profile Page/ProfilePageMain";
import Header from './Components/Header/HeaderMainComponent';
import AboutUs from './Components/AboutUsPage/AboutUs';
import JoggingLoader from './Components/JoggingLoader/JoggingLoader';
import "./common.css"
import Footer from './Components/Footer/FooterMain';
import UserPageMain from './Components/UserProfile/userPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const location = useLocation();

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

  const isLandingPage = location.pathname === '/';

  return (
    <div className="App">
      {loading ? (
        <JoggingLoader />
      ) : (
        <>
          <Header isLandingPage={isLandingPage} />
          <Routes>
            <Route path="/profile" element={<ProfilePageMain />} />
            <Route path="/products" element={<ProductListingPageMain />} />
            <Route path="/cart" element={<CartPageMain />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/user" element={<UserPageMain/>} />
            <Route path="/" element={<LandingPageMain />} />
          </Routes>
          {showFooter && <Footer />}
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
