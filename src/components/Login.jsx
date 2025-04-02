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
    <div className='flex flex-col items-center justify-center bg-gray-100 '>
      <div className="flex h-auto w-96 flex-1 flex-col justify-center mt-10 mb-20 bg-gray-300 rounded-xl shadow-2xl px-6 py-12 lg:px-8 ">
      <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-800">
            Login to your account
          </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
           <div className="space-y-6"> 
            <div >
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-500">
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
                 
                  className="block w-full rounded-md bg-gray-400 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-500">
                  Password
                </label>
                <div className="text-sm">
                  <Link to='/forgotpassword' className="font-semibold text-gray-600 hover:text-gray-500">
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
                  className="block w-full rounded-md bg-gray-400 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                />
              </div>
            </div>
            <p className="text-red-500 text-sm/6">{error}</p>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Login
              </button>
            </div>
            </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an Account ?{' '}
            <Link to="/signup" className="font-semibold text-gray-600 hover:text-gray-700">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default Login