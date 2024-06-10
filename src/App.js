import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPageMain from "./Components/CartPage/CartPageMain";
import LandingPageMain from "./Components/Landing page/LandingPageMain";
import ProductListingPageMain from "./Components/ProductListingPage/ProductListingPageMain";
import ProfilePageMain from "./Components/Profile Page/ProfilePageMain";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<ProfilePageMain />} />
          <Route path="/products" element={<ProductListingPageMain />} />
          <Route path="/cart" element={<CartPageMain />} />
          <Route path="/" element={<LandingPageMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
