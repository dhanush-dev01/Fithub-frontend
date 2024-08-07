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
import UserPageMain from './Components/UserProfile/userPage';
// import Chat from './Components/Chat-components/chat';
// import ChatLogin from './Components/Chat-components/ChatLogin';
import { AuthContext } from './Components/context/AuthContext';
import ChatHome from './Components/ChatModule/ChatHome';
import ChatLeader from './Components/chatdashboard_leader/chatleader';
import Receipt from './Components/CartPage/CartReceipt';
import UploadProducts from './Components/IntegratedCommunityPage/LeaderCommunityPage/UploadProducts';
import Notfound from './Components/NotFound/NotFound';
 
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  const {currentUser} = useContext(AuthContext)

  const ProtectedRouteChat = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/"/>
    }
    return children
  }

  const ProtectedRoute = ({children}) =>{
    let customerId = localStorage.getItem("customerId")
    if(!customerId){
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
            {/* <Route path="/profile" element={<ProfilePageMain />} /> */}
            {/* <Route path="/products" element={<ProductListingPageMain />} /> */}
            {/* <Route path="/cart" element={<CartPageMain />} /> */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<ProtectedRoute><UserPageMain/></ProtectedRoute>} />
            <Route path="/complete" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><UploadProducts /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRouteChat><ChatHome /></ProtectedRouteChat>} />
            <Route path="/" element={<LandingPageMain />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
         
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

 
 