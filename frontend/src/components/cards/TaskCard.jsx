import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const TaskCard = ({
  title = "Complete Project Documentation",
  description = "Create comprehensive documentation for the new API endpoints including usage examples, authentication methods, and error handling procedures.",
  dueDate = "2024-06-25",
  initialStatus = "In Progresss",
  onStatusChange,
}) => {
  const [status, setStatus] = useState(initialStatus || 'Pending');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const statusOptions = [
    { value: 'Pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'In Progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
  ];

  const currentStatusConfig =
    statusOptions.find(opt => opt.value === status) ||
    { label: 'Unknown', color: 'bg-gray-100 text-gray-800 border-gray-200' };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus); 
    setIsDropdownOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue =
    new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) &&
    status !== 'Completed';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 m-4">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight flex-1 pr-2">
            {title}
          </h3>
          <div className={`w-3 h-3 rounded-full mt-1 ${
            status === 'Completed' ? 'bg-green-400' :
            status === 'In Progress' ? 'bg-blue-400' : 'bg-yellow-400'
          }`} />
        </div>

        <p
          title={description}
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300"
        >
          {description}
        </p>

        <div className="flex items-center text-sm mb-4">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              Due {formatDate(dueDate)}
            </span>
          </div>
          {isOverdue && (
            <span className="ml-auto px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
              Overdue
            </span>
          )}
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="px-6 pb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Status
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl border-2 transition duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentStatusConfig.color}`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                status === 'pending' ? 'bg-yellow-500' :
                status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
              <span>{currentStatusConfig.label}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in duration-200">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    option.value === status ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      option.value === 'Pending' ? 'bg-yellow-400' :
                      option.value === 'In Progress' ? 'bg-blue-400' : 'bg-green-400'
                    }`} />
                    <span className="font-medium text-gray-700">{option.label}</span>
                    {option.value === status && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      
      {/* Completed Badge */}
      {status === 'Completed' && (
        <div className="px-6 pb-4">
          <div className="flex items-center text-green-600 text-sm font-medium">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Task completed successfully</span>
          </div>
        </div>
      )}

      {status === 'Pending' && (
        <div className="px-6 pb-4">
          <div className="flex items-center text-yellow-600 text-sm font-medium">
            <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Task Pending</span>
          </div>
        </div>
      )}

      {status === 'In Progress' && (
        <div className="px-6 pb-4">
          <div className="flex items-center text-blue-600 text-sm font-medium">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Task In Progress</span>
          </div>
        </div>
      )}

      {/* Accent Bar */}
      <div className={`h-1.5 ${
        status === 'Completed' ? 'bg-gradient-to-r from-green-400 to-green-600' :
        status === 'In Progress' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
        'bg-gradient-to-r from-yellow-400 to-yellow-600'
        
      }`} />
    </div>
  );
};

export default TaskCard;
