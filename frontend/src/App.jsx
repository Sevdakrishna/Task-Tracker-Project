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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;