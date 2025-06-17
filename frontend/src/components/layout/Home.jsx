import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-cyan-400">
        Welcome to Task Tracker
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-center max-w-3xl mb-10 text-gray-300">
        Your personal assistant to manage daily and weekly tasks efficiently. Whether you're a user organizing your to-dos or an admin managing a team’s progress, Task Tracker keeps you in control.
      </p>

      {/* Feature Cards */}
      <div className="mt-10 grid md:grid-cols-4 sm:grid-cols-2 gap-6 w-full max-w-6xl">
        {[
          {
            title: 'Secure Authentication',
            desc: 'Register and log in with role-based access control for users and admins.',
          },
          {
            title: 'Task Management',
            desc: 'Add, update, and track your tasks weekly. Stay on top of your priorities.',
          },
          {
            title: 'Admin Dashboard',
            desc: 'Admins can view all users and their tasks, manage productivity, and maintain progress.',
          },
          {
            title: 'Simple & Clean UI',
            desc: 'Enjoy a responsive, modern interface designed for a smooth user experience.',
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold text-purple-300 mb-2">{title}</h2>
            <p className="text-gray-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
