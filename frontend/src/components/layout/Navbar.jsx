// File: src/components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          onClick={() => navigate('/')}
          className="text-xl font-bold cursor-pointer"
        >
          Task Tracker
        </h1>

        <div className="space-x-4">
          {/* If no one is logged in */}
          {!user && (
            <>
              <button onClick={() => navigate('/login')} className="hover:underline">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="hover:underline">
                Register
              </button>
            </>
          )}

          {/* If user is logged in */}
          {user && (
            <>
              {/* Show role-specific dashboards */}
              {user.role === 'admin' && (
                <button onClick={() => navigate('/admin-dashboard')} className="hover:underline">
                  Admin Dashboard
                </button>
              )}
              {user.role === 'user' && (
                <button onClick={() => navigate('/user-dashboard')} className="hover:underline">
                  User Dashboard
                </button>
              )}

              <span className="text-sm italic">Hi, {user.username}</span>

              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
