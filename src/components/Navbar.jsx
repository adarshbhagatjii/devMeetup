import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = async() => {
    try{
    await axios.post(BASE_URL+'/logout', {}, {
      withCredentials: true
    })
    dispatch(removeUser());
    dispatch(addFeed([])); 
     return navigate('/login');
  }catch(err){
    console.log(err);
  }

  }
  
  
  return (
    <div className="navbar bg-gray-300 shadow-lg">
    <div className="flex-1">
      <a href='/' className="btn btn-ghost text-xl">Dev Tinder</a>
    </div>
    {user &&(<div className="flex gap-2 items-center">
      
     <div>Welcome, {user.firstName}</div>
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
              <span className="badge">New</span>
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
