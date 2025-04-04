import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './components/Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import { BASE_URL } from './utils/constants'


const Body = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
   if(userData) return;
    try {

      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data))


    } catch (err) {
      if (err.status === 401) {
        navigate('/login')
      }
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
