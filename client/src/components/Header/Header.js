import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserSuccess } from '../../redux/userSlice';
import './Header.css';

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(signOutUserSuccess());
    localStorage.removeItem('persist:root');
    navigate('/account/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ COMB</Link>
      </div>

      <nav className="nav-links">
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/checkout">Cart</Link>

        {!currentUser ? (
          <Link to="/account/login" className="login-btn">Login</Link>
        ) : (
          <div className="profile-wrapper">
            <div
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
              title="Account"
            >
              {getUserInitials(currentUser.name)}
            </div>

            {showDropdown && (
              <div className="profile-dropdown">
                <p onClick={() => navigate('/account/me')}>My Account</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
