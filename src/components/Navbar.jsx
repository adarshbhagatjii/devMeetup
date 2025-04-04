import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { addUser, removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handelLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, {
        withCredentials: true
      })
      dispatch(removeUser());
      dispatch(addFeed([]));
      return navigate('/login');

    } catch (err) {
      console.log(err);
    }

  }


  return (
    <div className="navbar bg-gray-300 shadow-lg">
      <div className="flex-1 ">
        <a href='/'  ><svg className="hover:bg-gray-200 rounded-lg" viewBox="0 0 460 120" width="260" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">

          <g transform="translate(20, 30)">

            <circle cx="20" cy="10" r="10" fill="#6B7280" />
            <path d="M10 30 C10 20, 30 20, 30 30 C30 40, 10 40, 10 30 Z" fill="#6B7280" />


            <circle cx="40" cy="10" r="10" fill="#000000" />
            <path d="M30 30 C30 20, 50 20, 50 30 C50 40, 30 40, 30 30 Z" fill="#000000" />


            <path d="M20 30 C22 35, 38 35, 40 30" stroke="#6B7280" stroke-width="3" fill="none" />
          </g>


          <text x="90" y="75" font-family="Segoe UI, sans-serif" font-size="48" fill="#6B7280" font-weight="bold">Dev</text>


          <text x="220" y="75" font-family="Segoe UI, sans-serif" font-size="48" fill="#000000" font-weight="bold">MeetUp</text>
        </svg></a>
      </div>
      {user && (<div className="flex gap-2 items-center">

        
        <div className="dropdown dropdown-end mx-5 ">

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.imageUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to='/profile' className="justify-between">
                Profile

              </Link>
            </li>
            <li>
              <Link to='/connection' className="justify-between">
                Connections
              </Link>
              <Link to='/request' className="justify-between">
                Request
              </Link>
            </li>
            <li><a onClick={handelLogout}>Logout</a></li>
          </ul>
        </div>
      </div>)}
    </div>
  )
}

export default Navbar
