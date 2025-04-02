import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaPaperPlane } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { createSocketConnevtion } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const Chat = () => {
    const { targetUserId } = useParams();
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector((store) => store.user);
    const userId = user?._id;


    const sendMessage = () => {
        // if (chatInput.trim()) {
        //     setMessages([...messages, { sender: 'You', text: chatInput }]);
        //     setChatInput('');
        // }
        const socket = createSocketConnevtion();
        socket.emit('sendMessage', { firstName: user.firstName, text: chatInput, targetUserId, userId, });
        setChatInput('');

    };

    const fetchSendMessages = async () => {
        const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, { withCredentials: true, });

        const chatMessages = chat?.data?.messages.map((msg) => {
            return {
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text: msg?.text,


            }

        });
        setMessages(chatMessages);


    }
    useEffect(() => {
        fetchSendMessages();
    })


    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnevtion();
        socket.emit('joinchat', { firstName: user?.firstName, userId, targetUserId });

        socket.on('messageReceived', ({ firstName, text }) => {
            console.log(firstName + ' sent message ' + text);
            setMessages((messages) => [...messages, { firstName, text }]);
        }

        )


        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          
            {/* Chat Box - Centered & 80% Width */}
            <div className=" rounded-xl shadow-md h-[80vh] w-4/5 max-w-4xl flex flex-col">
                {/* Chat Header */}
                <div className="bg-gray-700 text-white px-6 py-4 flex justify-between items-center shadow-md rounded-t-xl">
                    <h2 className="text-lg font-semibold">Chit Chat </h2>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-5 bg-gray-300 ">
                    {
                        messages.map((msg, index) => {
                            return (
                                <div key={index} className={'chat' +(user.firstName===msg.firstName? ' chat-end':' chat-start')}>
                                    <div className="chat-header text-gray-800">
                                        {`${msg.firstName} ${msg.lastName}`}
                                        <time className="text-xs opacity-50 text-gray-800">2 hours ago</time>
                                    </div>
                                    <div className="chat-bubble bg-gray-600 text-white">{msg.text}</div>
                                    <div className="chat-footer opacity-50 text-gray-800">Seen</div>
                                </div>
                            )
                        })
                    }

                </div>

                {/* Chat Input */}
                <div className="bg-gray-600 p-4 border-t flex items-center gap-2 rounded-b-xl">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 border-none text-black font-semibold rounded-full bg-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <label className="cursor-pointer">
                        <input type="file" className="hidden" />
                        <FiPaperclip className="text-gray-800 hover:text-gray-900 text-lg" />
                    </label>
                    <button
                        onClick={sendMessage}
                        className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>)
};

export default Chat;











// {messages.map((msg, index) => (
//     <div key={index} className={`flex justify-start`}>
//         <div className={`p-3 max-w-xs rounded-lg text-sm shadow-md text-black bg-indigo-500`}>
//             <strong>{msg.firstName+ ' '+ msg.lastName}</strong>: {msg.text}
//         </div>
//     </div>
// ))}