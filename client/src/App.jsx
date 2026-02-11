import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import MyBookingsPage from './pages/MyBookingsPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/my-bookings"
        element={(
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        )}
      />
    </Routes>
  </div>
);

export default App;
