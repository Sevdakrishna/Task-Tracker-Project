import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import ListTask from '../tasks/ListTask';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await api.get('/admin/all-tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">📋 All Tasks</h2>
        {loading ? (
          <p className="text-gray-300">Loading tasks...</p>
        ) : (
          <ListTask tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default AllTasks;
