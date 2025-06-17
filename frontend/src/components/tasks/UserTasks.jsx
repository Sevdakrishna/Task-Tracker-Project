import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import TaskCard from '../cards/TaskCard';

function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/my-tasks');
      if (res.status === 200) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status.toLowerCase() === statusFilter.toLowerCase())
    : tasks;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-800 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        📋 My Tasks
      </h2>

      <div className="mb-6">
        <label className="mr-3 font-medium text-gray-700 dark:text-gray-300">🔎 Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray300 dark:border-gray-100 dark:bg-gray-100 dark:text-black px-3 py-1.5 rounded-md focus:outline-none"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <hr className="border-t border-gray-300 my-6" />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No tasks found.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start overflow-x-auto p-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.due_date}
              initialStatus={task.status}
              onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserTasks;
