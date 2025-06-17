import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function UserHome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-800 min-h-screen px-4 py-10 text-white">
      <div className="mx-auto bg-gray-950 p-8 sm:p-10 rounded-xl shadow-2xl max-w-6xl border border-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Welcome, {user?.username || 'User'}! 👋
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          Here's your dashboard to add, manage, and review your weekly tasks.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Add New Task */}
          <div className="bg-gray-900 p-6 rounded-lg border border-purple-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-purple-400">
              📝 Add New Task
            </h2>
            <p className="text-gray-400 mb-6">
              Quickly create a new task and assign a deadline.
            </p>
            <button
              onClick={() => navigate('/tasks/add')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white w-full transition"
            >
              Add Task
            </button>
          </div>

          {/* View My Tasks */}
          <div className="bg-gray-900 p-6 rounded-lg border border-green-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-400">
              📋 View My Tasks
            </h2>
            <p className="text-gray-400 mb-6">
              Review tasks, update statuses, or delete completed ones.
            </p>
            <button
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white w-full transition"
            >
              View Tasks
            </button>
          </div>

          {/* Weekly Summary */}
          <div className="bg-gray-900 p-6 rounded-lg border border-yellow-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-yellow-400">
              📅 Weekly Summary
            </h2>
            <p className="text-gray-400 mb-6">
              Track your progress for the current week.
            </p>
            <button
              onClick={() => navigate('/summary')}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white w-full transition"
            >
              View Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
