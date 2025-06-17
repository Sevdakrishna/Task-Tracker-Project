import React from 'react';

function ListTask({ tasks }) {
  return (
    <div className="overflow-x-auto bg-gray-900 shadow-lg rounded border border-gray-700">
      <table className="min-w-full bg-gray-900 text-sm text-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-700 hover:bg-gray-800">
              <td className="p-3">{task.id}</td>
              <td className="p-3">{task.username}</td>
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.description}</td>
              <td className="p-3">{task.due_date?.slice(0, 10)}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'Completed'
                      ? 'bg-green-700 text-green-100'
                      : task.status === 'In Progress'
                      ? 'bg-yellow-600 text-yellow-100'
                      : 'bg-red-700 text-red-100'
                  }`}
                >
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTask;
