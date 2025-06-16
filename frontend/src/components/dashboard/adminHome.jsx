// File: src/components/dashboard/AdminHome.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function AdminHome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-20 px-4 py-10">
      <div className="mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Welcome, Admin {user?.username || ''} 
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          You have admin privileges to manage users, tasks, and view overall system status. Use the dashboard tools below to perform your operations.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">👥 Manage Users</h2>
            <p className="text-gray-700 mb-3">
              View, update or delete user accounts and control their access.
            </p>
            <button
              onClick={() => navigate('/admin/users')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Go to Users
            </button>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">📋 View All Tasks</h2>
            <p className="text-gray-700 mb-3">
              Monitor tasks created by all users and track their status.
            </p>
            <button
              onClick={() => navigate('/admin/tasks')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Tasks
            </button>
          </div>

          {/* <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">📊 System Analytics</h2>
            <p className="text-gray-700 mb-3">
              Get a visual overview of system usage and productivity stats.
            </p>
            <button
              onClick={() => navigate('/admin/analytics')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View Analytics
            </button>
          </div> */}

          {/* <div className="bg-yellow-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
            <p className="text-gray-700 mb-3">
              Configure system-level settings and admin preferences.
            </p>
            <button
              onClick={() => navigate('/admin/settings')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Go to Settings
            </button>
          </div> */}

          {/* <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">🚨 System Logs</h2>
            <p className="text-gray-700 mb-3">
              Check application logs and recent user activities.
            </p>
            <button
              onClick={() => navigate('/admin/logs')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              View Logs
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
