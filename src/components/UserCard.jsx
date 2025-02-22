import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, bio, gender , imageUrl, age} = user;
  return (
    <div className="card w-80 bg-base-300 p-4 rounded-md flex flex-col items-center mx-3  mt-10 shadow-lg">
        <div className='w-[90%] h-50 bg-orange-600 rounded-md overflow-hidden'>
        <img className= 'w-full h-full rounded-xl object-cover'
      src={imageUrl}
      alt="Profilepic"
       />
        </div>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName+ ' '+ lastName}</h2>
    <h2 className="card-title">{age +' '+gender}</h2>
    <p>{bio}</p>
    <div className=" flex gap-2 ">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary bg-pink-600">Interested</button>
      
    </div>
  </div>
</div>
  )
}

export default UserCard