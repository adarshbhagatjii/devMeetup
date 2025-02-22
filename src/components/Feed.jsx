import React, { useEffect } from 'react'
import axios  from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './USerCard';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store)=> store.feed);

  const  getFeed = async()=>{
    if(feed){
      return;
    } 
    try{
      const res = await axios.get( BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res.data));
     
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  return (
    feed && (
      <div className='flex flex-col items-center justify-center '>
      <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed