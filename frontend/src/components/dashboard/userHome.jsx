// File: src/components/dashboard/UserHome.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function UserHome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-20 px-4 py-10">
      <div className="mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Welcome, {user?.username || 'User'}! 
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          This is your personal dashboard where you can manage your weekly tasks efficiently and track your progress.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">📝 Add New Task</h2>
            <p className="text-gray-700 mb-10">
              Quickly create a new task and assign a deadline.
            </p>
            <button
              onClick={() => navigate('/tasks/add')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">📋 View My Tasks</h2>
            <p className="text-gray-700 mb-3">
              Check your current tasks, update statuses, or delete completed ones.
            </p>
            <button
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View Tasks
            </button>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">📅 Weekly Summary</h2>
            <p className="text-gray-700 mb-3">
              See a summary of tasks completed and pending this week.
            </p>
            <button
              onClick={() => navigate('/summary')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              View Summary
            </button>
          </div>

          {/* <div className="bg-red-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
            <p className="text-gray-700 mb-8">
              Edit your profile or change your password and preferences.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Go to Settings
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
