import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import ListTask from '../tasks/ListTask';

function AdminDashboard() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const [usersRes, tasksRes] = await Promise.all([
          api.get('/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          api.get('/admin/filter-tasks', {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        setUsers(usersRes.data);
        setFilteredTasks(tasksRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const params = {};
        if (selectedUser) params.user_id = selectedUser;
        if (selectedStatus) params.status = selectedStatus;
        if (dateRange.startDate) params.start_date = dateRange.startDate;
        if (dateRange.endDate) params.end_date = dateRange.endDate;

        const res = await api.get('/admin/filter-tasks', {
          headers: { Authorization: `Bearer ${token}` },
          params: params
        });

        setFilteredTasks(res.data);
      } catch (err) {
        console.error("Error filtering tasks:", err);
      }
    };

    fetchFilteredTasks();
  }, [selectedUser, selectedStatus, dateRange.startDate, dateRange.endDate]);


   // Add date validation helper
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-800 px-6 py-10 text-white">
      {/* <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"> */}
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-2 flex items-center gap-2">
            📊 Admin Task Dashboard
          </h2>
          <p className="text-gray-300 text-lg">
            View and filter tasks by user or status.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {/* User filter */}
          <select
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              min={dateRange.startDate}
              onChange={handleDateChange}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          {(dateRange.startDate || dateRange.endDate) && (
            <button
              onClick={() => setDateRange({ startDate: '', endDate: '' })}
              className="mt-6 p-2 text-gray-400 hover:text-white"
              title="Clear dates"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        </div>

        {/* Task List */}
        <ListTask tasks={filteredTasks} />
      </div>
    // </div>
  );
}

export default AdminDashboard;
