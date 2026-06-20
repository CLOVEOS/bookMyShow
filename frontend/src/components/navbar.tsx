import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const Navbar: React.FC = () => {
  const { token, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-black tracking-wider text-red-500">
        BOOK<span className="text-white">MY</span>SHOW
      </Link>
      <div className="flex items-center gap-6 font-medium text-sm">
        {token ? (
          <>
            <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
            <Link to="/bookings" className="hover:text-red-400 transition-colors">My Bookings</Link>
            {isAdmin && (
              <Link to="/admin" className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded font-bold transition-colors">
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-bold transition-colors">
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
};