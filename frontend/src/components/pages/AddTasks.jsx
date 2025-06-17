import React, { useState, useContext } from 'react';
import api from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function AddTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'Pending',
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/tasks/create', {
        ...task,
        userid: user.user_id, // Attach current user's username
      });
      alert('✅ Task added successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to add task');
    }
  };

  return (
    <div className='bg-gradient-to-br from-gray-800 to-gray-800 p-15' >
    <div className="max-w-xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400 text-center">📝 Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="w-full mb-4 p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
          className="w-full mb-4 p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
        Add Task
        </button>
      </form>
    </div>
    </div>
  );
}

export default AddTask;
