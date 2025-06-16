// File: src/components/layout/Home.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleGetStarted = () => {
  //   if (user?.role === 'admin') {
  //     navigate('/admin-dashboard');
  //   } else if (user?.role === 'user') {
  //     navigate('/user-dashboard');
  //   } else {
  //     navigate('/register');
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to Task Tracker
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-6">
        Your personal assistant to manage daily and weekly tasks efficiently. Whether you're a user organizing your to-dos or an admin managing a team’s progress, Task Tracker keeps you in control.
      </p>

      {/* <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        {user ? 'Go to Dashboard' : 'Get Started'}
      </button> */}

      <div className="mt-20 grid md:grid-cols-4 gap-8 max-w-4xl">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Secure Authentication</h2>
          <p className="text-gray-600">
            Register and log in with role-based access control for users and admins.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Task Management</h2>
          <p className="text-gray-600">
            Add, update, and track your tasks weekly. Stay on top of your priorities.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">
            Admins can view all users and their tasks, manage productivity, and maintain progress.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Simple & Clean UI</h2>
          <p className="text-gray-600">
            Enjoy a responsive, modern interface designed for a smooth user experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
