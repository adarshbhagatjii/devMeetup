import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const request = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const handelRequest = async(status, _id)=>{
        try{
            await axios.post(BASE_URL+'/request/review/'+ status+'/'+_id, {}, {
                withCredentials: true
            });
            dispatch(removeRequest(_id));
        }catch(err){
            console.log(err);
        }
    }    

    const getRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/request/received', {
                withCredentials: true
            });
            dispatch(addRequest(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        getRequest();
    }, []);

    if (!request) {
        return <h1 className="text-center text-2xl font-semibold text-gray-300 mt-10">Loading...</h1>;
    }

    if (request.length === 0) {
        return <h1 className="text-center text-2xl font-semibold text-gray-200 mt-10">No Request found</h1>;
    }
    

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">Connections Request</h1>
            <div className="flex flex-col items-center space-y-6">
                {request.map((requests) => {
                    const { firstName, lastName, age, gender, bio, imageUrl, _id } = requests.fromUserId;
                    return (
                        <div key={_id} className="w-4/5 bg-gray-800 shadow-md rounded-xl p-5 flex items-center space-x-6 hover:shadow-lg transition-shadow duration-300">
                            {/* Profile Image */}
                            <img
                                src={imageUrl}
                                alt={firstName}
                                className="w-28 h-28 object-cover rounded-lg border-4 border-blue-500 shadow-md"
                            />

                            {/* Info Section */}
                            <div className="flex-1">
                                {/* Name */}
                                <h2 className="text-2xl font-semibold text-gray-300">{firstName} {lastName}</h2>

                                {/* Age & Gender */}
                                <p className="text-gray-300 mt-1 text-lg font-medium">{gender}, {age} years old</p>

                                {/* Bio */}
                                <p className="text-gray-300 mt-3">{bio}</p>
                            </div>
                            <div className="flex flex-col mr-10">
                            <button className="mt-4 px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition duration-200 cursor-pointer"
                            onClick={()=>handelRequest('accepted', requests._id)}>
                                Accept
                                </button>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
                            onClick={()=>handelRequest('rejected', requests._id)}>
                                    Reject
                                </button> 
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Request;
