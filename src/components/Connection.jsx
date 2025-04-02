import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router';

const Connection = () => {
    const connection = useSelector((store) => store.connection);
    const dispatch = useDispatch();

  

    const getConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        getConnection();
    }, []);

    if (!connection) {
        return <h1 className="text-center text-2xl font-semibold text-gray-300 mt-10">Loading...</h1>;
    }

    if (connection.length === 0) {
        return <h1 className="text-center text-2xl font-semibold text-gray-300 mt-10">No connections found</h1>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Connections</h1>
  <div className="flex flex-col items-center space-y-6">
    {connection.map((connections) => {
      const { firstName, lastName, age, gender, bio, imageUrl, _id } = connections;
      return (
        <div key={_id} className="w-full max-w-md bg-gray-200 shadow-md rounded-xl p-5 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 hover:shadow-lg transition-shadow duration-300 mb-10">
          <img
            src={imageUrl}
            alt={firstName}
            className="w-28 h-28 object-cover rounded-lg border-4 border-gray-500 shadow-md"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-600">{firstName} {lastName}</h2>
            <p className="text-gray-600 mt-1 text-lg font-medium">{gender}, {age} years old</p>
            <p className="text-gray-600 mt-3">{bio}</p>
          </div>
          <div>
            <Link to={"/chat/"+ _id} ><button className='flex w-full cursor-pointer justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>Chat</button> </Link>
            
          </div>
        </div>
      );
    })}
  </div>
</div>

    );
};

export default Connection;
