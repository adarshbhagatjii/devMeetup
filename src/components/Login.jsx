import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {

   const [email, setEmail] =useState("modi123@gmail.com");
   const [password, setPassword] = useState("Modi@123");
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = async()=>{
    try{
      const res = await axios.post( BASE_URL + "/login", {
        email: email,
        password: password
      }, {
        withCredentials: true
      });
     
      dispatch(addUser(res.data));
      navigate('/');
     
    }
    catch(err){
      setError(err?.response?.data || 'something went wrong');
      console.log(err)
    }
   }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
  <div className="w-full max-w-sm flex flex-col justify-center bg-gray-300 rounded-xl shadow-2xl px-6 py-10 mb-16">
    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-800">
      Login to your account
    </h2>

    <div className="mt-6 w-full">
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md bg-gray-400 px-3 py-2 text-base text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="text-sm">
              <Link to="/forgotpassword" className="font-semibold text-gray-700 hover:text-gray-500">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-gray-400 px-3 py-2 text-base text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-900"
          >
            Login
          </button>
        </div>
      </div>

      {/* Signup Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-gray-700 hover:text-gray-500">
          Signup
        </Link>
      </p>
    </div>
  </div>
</div>

    
  )
}

export default Login