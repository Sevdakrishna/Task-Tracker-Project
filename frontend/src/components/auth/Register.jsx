import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

function RegisterPage() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await registerUser({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-800 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-950 text-white p-8 sm:p-10 rounded-lg shadow-2xl w-full max-w-md border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center tracking-wide">
          Create Account ✨
        </h2>

        {error && (
          <div className="bg-red-600 bg-opacity-20 border border-red-400 text-red-300 px-4 py-2 rounded mb-4 animate-pulse">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            placeholder="FirstName LastName"
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm text-gray-300">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full p-3 pr-10 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute top-9 right-3 text-gray-400 hover:text-cyan-400 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-cyan-600 hover:bg-cyan-700 transition py-2 rounded text-white font-semibold tracking-wide ${
            isLoading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
