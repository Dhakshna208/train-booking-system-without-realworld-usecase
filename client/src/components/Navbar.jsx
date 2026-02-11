import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primaryBlue">RailBook</Link>
        <div className="space-x-4 text-sm">
          <Link to="/search" className="text-darkBlue hover:text-primaryBlue">Search</Link>
          {isAuthenticated && <Link to="/my-bookings" className="text-darkBlue hover:text-primaryBlue">My Bookings</Link>}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-darkBlue hover:text-primaryBlue">Login</Link>
              <Link to="/register" className="bg-primaryBlue text-white px-3 py-2 rounded-lg">Register</Link>
            </>
          ) : (
            <button type="button" onClick={handleLogout} className="bg-primaryBlue text-white px-3 py-2 rounded-lg">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
