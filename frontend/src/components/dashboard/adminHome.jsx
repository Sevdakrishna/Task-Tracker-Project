// File: src/components/dashboard/AdminHome.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function AdminHome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-800 min-h-screen px-4 py-10 text-white">
      <div className="mx-auto bg-gray-900 p-8 sm:p-10 rounded-xl shadow-2xl max-w-6xl border border-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-white-400">

          Welcome, {user?.username || ''} 

        </h1>

        <p className="text-gray-300 text-lg mb-10">
          You have admin privileges to monitor and manage system-wide tasks and dashboards.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* View All Tasks */}
          <div className="bg-gray-900 p-6 rounded-lg border border-green-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-400">
              📋 View All Tasks
            </h2>
            <p className="text-gray-400 mb-6">
              Monitor all user-created tasks, statuses, and deadlines.
            </p>
            <button
              onClick={() => navigate('/admin/tasks')}
              className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded text-white w-full transition"
            >
              View Tasks
            </button>
          </div>

          {/* Filter Dashboard */}
          <div className="bg-gray-900 p-6 rounded-lg border border-indigo-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-300">
              🔍 Filter Dashboard
            </h2>
            <p className="text-gray-400 mb-6">
              Summary of all tasks filtered by user and status.
            </p>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white w-full transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
