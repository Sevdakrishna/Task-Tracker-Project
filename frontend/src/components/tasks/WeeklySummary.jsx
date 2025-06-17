import React, { useEffect, useState } from 'react';
import {
  Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Activity
} from 'lucide-react';
import api from '../../services/Api'; // using your axios setup

function WeeklySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks/weekly-summary');
        const data = response.data.summary;

        const completionRate = data.total > 0
          ? Math.round((data.completed / data.total) * 100)
          : 0;

        const avgTasksPerDay = (data.total / 7).toFixed(1);

        setSummary({ ...data, completionRate, avgTasksPerDay });
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading your weekly summary...</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const StatCard = ({ icon: Icon, title, value, subtitle, color, delay }) => (
    <div
      className={`bg-gray-800 rounded-xl p-6 border border-gray-500 transition-all ${
        activeCard === title ? 'ring-2 ring-indigo-500' : ''
      }`}
      onMouseEnter={() => setActiveCard(title)}
      onMouseLeave={() => setActiveCard(null)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Weekly Task Summary
          </h1>
          <p className="text-gray-400 text-lg">Your productivity insights for this week</p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Activity} title="Total Tasks" value={summary.total} color="bg-blue-600" delay={0} />
          <StatCard icon={CheckCircle} title="Completed" value={summary.completed} subtitle={`${summary.completionRate}% done`} color="bg-green-600" delay={100} />
          <StatCard icon={Clock} title="In Progress" value={summary.inProgress} color="bg-yellow-500" delay={200} />
          <StatCard icon={AlertCircle} title="Pending" value={summary.pending} color="bg-red-500" delay={300} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
                <div className="text-3xl font-bold">{summary.completionRate}%</div>
                <p className="text-indigo-100 mt-2">Keep up the good work!</p>
              </div>
              <TrendingUp className="h-10 w-10 text-indigo-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Average Tasks/Day</h3>
                <div className="text-3xl font-bold">{summary.avgTasksPerDay}</div>
                <p className="text-green-100 mt-2">Daily average this week</p>
              </div>
              <Activity className="h-10 w-10 text-green-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklySummary;
