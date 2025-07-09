import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css'; // create/update CSS accordingly

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const getUserInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ MyShop</Link>
      </div>

      <nav className="nav-links">
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/checkout">Cart</Link>

        {!currentUser ? (
          <Link to="/account/login" className="login-btn">Login</Link>
        ) : (
          <div
            className="profile-icon"
            onClick={() => navigate('/account/me')}
            title="My Account"
          >
            {getUserInitials(currentUser.name)}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;