import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const handleHome = () => {
    if (user.role === 'admin') {
      navigate('/admin-home');
    } else {
      navigate('/user-home');
    }
    setShowDropdown(false);
  };

  const handleLogoClick = () => {
    if (!user) {
      navigate('/');
    } else if (user.role === 'admin') {
      navigate('/admin-home');
    } else {
      navigate('/user-home');
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-6 shadow-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1
            onClick={handleLogoClick}

            className="text-2xl sm:text-3xl font-bold text-cyan-400 cursor-pointer hover:scale-105 transition-transform duration-200">
          <img src="/image.png" alt="Task Tracker Logo" className="w-8 h-8 inline-block mr-2" style={{ verticalAlign: 'middle' }} />

            Task Tracker
            

          </h1>
        </div>

        {/* Right Menu */}
        <div className="space-x-6">
          {!user && (
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="text-xl hover:text-cyan-300 transition duration-200"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')} 
                className="text-xl hover:text-cyan-300 transition duration-200"
              >
                Register
              </button>
            </>
          )}

          {user && (
            <div className="flex items-center gap-4">
              {/* Dashboard */}
              {/* {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/admin-dashboard')} 
                  className="text-xl font-semibold hover:text-cyan-300 transition duration-200"
                >
                  Dashboard
                </button>
              )} */}

              {/* Greeting */}
              <div className="text-base">
                <span className="font-medium text-cyan-300">{user.username}</span>
              </div>

              {/* Profile Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-white hover:text-cyan-400 transition duration-200"
                  title="Profile Menu"
                >
                  <FaUserCircle size={24} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg z-50 border border-gray-700">
                    <button
                      onClick={handleHome}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t"
                    >
                      Home
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
