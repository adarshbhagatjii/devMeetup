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
        <div className="max-w-6xl mx-auto p-4 mb-18 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-700">Connections Request</h1>
            <div className="flex flex-col items-center space-y-6 sm:mb-18">
                {request.map((requests) => {
                    const { firstName, lastName, age, gender, bio, imageUrl, _id } = requests.fromUserId;
                    return (
                        <div 
                            key={_id} 
                            className="w-full sm:w-4/5 bg-gray-200 shadow-md rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300"
                        >
                            
                            <img
                                src={imageUrl}
                                alt={firstName}
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border-4 border-gray-500 shadow-md"
                            />

                            
                            <div className="flex-1 text-center sm:text-left">
                                
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">{firstName} {lastName}</h2>

                                
                                <p className="text-gray-700 mt-1 text-sm sm:text-lg font-medium">{gender}, {age} years old</p>

                               
                                <p className="text-gray-700 mt-3 text-sm sm:text-base">{bio}</p>
                            </div>

                            
                            <div className="flex flex-col space-y-3 w-full sm:w-auto">
                                <button 
                                    className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition duration-200"
                                    onClick={() => handelRequest('accepted', requests._id)}
                                >
                                    Accept
                                </button>
                                <button 
                                    className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition duration-200"
                                    onClick={() => handelRequest('rejected', requests._id)}
                                >
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
