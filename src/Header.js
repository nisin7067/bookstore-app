import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Header.css'; // Import CSS for styling
import AdminDashboard from './AdminDashboard';
import Cart from './Cart';
import AdminLogin from './AdminLogin';
import BookCatalog from './BookCatalog';

const Header = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <Router>
      <div className="header-container">
        <div className="logo">
          <Link to="/">Bookstore</Link>
        </div>
        <div className="nav-links">
          <Link to="/admin-login">Admin Login</Link>
          <Link to="/user-login">User Login</Link>
          <Link to="/books">Books</Link>
          {/* Cart button with total quantity */}
          <Link to="/cart" className="cart-link">
            Cart {cartItems.length > 0 && <sup>{cartItems.reduce((total, item) => total + item.quantity, 0)}</sup>}
          </Link>
        </div>
      </div>

      <Routes>
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/" element={<BookCatalog />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default Header;
