import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import CartPageMain from "./Components/CartPage/CartPageMain";
import LandingPageMain from "./Components/Landing page/LandingPageMain";
import ProductListingPageMain from "./Components/ProductListingPage/ProductListingPageMain";
import ProfilePageMain from "./Components/Profile Page/ProfilePageMain";
import Login from './Components/Loginpage/login';
import Header from './Components/Header/HeaderMainComponent';
import AboutUs from './Components/AboutUsPage/AboutUs';
import JoggingLoader from './Components/JoggingLoader/JoggingLoader';
import "./common.css"
import Footer from './Components/Footer/FooterMain';
import UserPageMain from './Components/UserProfile/userPage';
// import Chat from './Components/Chat-components/chat';
// import ChatLogin from './Components/Chat-components/ChatLogin';
import { AuthContext } from './Components/context/AuthContext';
import ChatHome from './Components/ChatModule/ChatHome';
import ChatLeader from './Components/chatdashboard_leader/chatleader';
import Receipt from './Components/CartPage/CartReceipt';
import UploadProducts from './Components/IntegratedCommunityPage/LeaderCommunityPage/UploadProducts';
 
function App() {
  const [loading, setLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const location = useLocation();


  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/"/>
    }
    return children
  }
 
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
        {window.location.pathname != "/cart" &&<Header isLandingPage={isLandingPage} />}
          <Routes>
            <Route path="/profile" element={<ProfilePageMain />} />
            <Route path="/products" element={<ProductListingPageMain />} />
            <Route path="/cart" element={<CartPageMain />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserPageMain/>} />
            <Route path="/upload" element={<UploadProducts />} />
            <Route path="/chat" element={<ProtectedRoute><ChatHome /></ProtectedRoute>} />
            <Route path="/" element={<LandingPageMain />} />
          </Routes>
         
          {showFooter && window.location.pathname != "/complete" && <Footer />}
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

 
 