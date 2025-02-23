import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(BASE_URL + '/signup', {
        firstName,
        lastName,
        email,
        password
      }, {
        withCredentials: true
      });

      dispatch(addUser(res.data.data));
      navigate('/profile'); // Redirect to dashboard after signup
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
      <div className="w-96 p-8 bg-gray-800 rounded-xl shadow-xl">
        <h2 className="text-center text-2xl font-bold text-indigo-600">
          Create an Account
        </h2>

        <div className="mt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-2 rounded-md bg-gray-400 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-2 rounded-md bg-gray-400 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 rounded-md bg-gray-400 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 rounded-md bg-gray-400 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-indigo-600"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
