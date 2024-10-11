import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false); // Switch between login and register
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Prevent spaces in both username and password inputs
    setUserData({ ...userData, [name]: value.replace(/\s+/g, '') });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Registration Logic
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/api/register`, {
          ...userData,
          userIdYelp: uuidv4(),
        });
        if (response.data.success) {
          Cookies.set('userIdYelp', response.data.userId, { expires: 1 });
          reloadPage();
        } else {
          setError(response.data.message);
        }
      } else {
        // Login Logic
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/api/login`, userData);
        if (response.data.success) {
          Cookies.set('userIdYelp', response.data.userId, { expires: 1 });
          reloadPage();
        } else {
          setError(response.data.message);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-center text-3xl font-extrabold text-lime-600">
          Welcome to YelpCamp
        </h1>
        <p className="text-center text-lg text-gray-400">
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </p>
        <h2 className="text-center text-2xl font-semibold text-gray-100">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
              className="w-full px-10 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Username"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
              className="w-full px-10 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Password"
            />
            <div className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleForm}
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
