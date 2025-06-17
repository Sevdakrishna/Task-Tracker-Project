import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserHome from './components/dashboard/userHome';
import AdminHome from './components/dashboard/adminHome';
import AllTasks from './components/pages/AllTasks';
// import AllUsers from './components/pages/AllUsers';
import UserTasks from './components/tasks/UserTasks';
import AddTask from './components/pages/AddTasks';
import WeeklySummary from './components/tasks/WeeklySummary';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin/tasks" element={<AllTasks />} />
          {/* <Route path="/admin/users" element={<AllUsers />} /> */}
          {/* <Route path="/tasks" element={<UserTasks />} /> */}
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/tasks" element={<UserTasks />} />
          <Route path="/summary" element={<WeeklySummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;