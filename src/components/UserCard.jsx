import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice'
import avatar from '../assets/avatar.png'


const UserCard = ({user}) => {
  const dispatch = useDispatch();
    const {_id, firstName, lastName, bio, gender , imageUrl, age} = user;
    const  handelSendRequest = async(status, userId)=>{
        try{
            await axios.post(BASE_URL+'/request/send/'+ status+'/'+userId, {}, {
                withCredentials: true
            });
            dispatch(removeFeed(userId));
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="card w-80 bg-base-300 p-4 rounded-md flex flex-col items-center mx-3  mt-18 shadow-lg  ">
        <div className='w-[90%] h-50 bg-gray-600 rounded-md overflow-hidden'>
        {imageUrl ? (
        <img src={imageUrl} alt="User Avatar" className="w-full h-full rounded-xl object-cover" />
      ) : (
        <img src={avatar} alt="Default Avatar" className="w-full h-full rounded-xl object-cover" />
      )}
        
        </div>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName+ ' '+ lastName}</h2>
    <h2 className="card-title">{age +' '+gender}</h2>
    <p>{bio}</p>
    <div className=" flex gap-2 ">
    <button className="btn btn-primary bg-gray-600" onClick={()=>handelSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-primary bg-pink-600" onClick={()=>handelSendRequest("interested", _id)}>Interested</button>
      
    </div>
  </div>
</div>
  )
}

export default UserCard