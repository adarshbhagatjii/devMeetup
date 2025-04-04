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
    }, [targetUserId])


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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
        
        <div className="w-full max-w-4xl h-[80vh] flex flex-col rounded-xl shadow-md bg-white mb-16">
          
         
          <div className="bg-gray-700 text-white px-4 py-3 flex justify-between items-center shadow-md rounded-t-xl">
            <h2 className="text-lg font-semibold">Chit Chat</h2>
          </div>
      
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-300 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
                <div className="chat-header text-gray-800 text-sm">
                  {`${msg.firstName} ${msg.lastName}`} 
                  
                </div>
                <div className="chat-bubble bg-gray-600 text-white px-4 py-2 rounded-lg">{msg.text}</div>
                
              </div>
            ))}
          </div>
      
          
          <div className="bg-gray-600 p-3 flex items-center gap-2 rounded-b-xl">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border-none text-black text-sm rounded-full bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
      </div>
      

      )
};

export default Chat;











// {messages.map((msg, index) => (
//     <div key={index} className={`flex justify-start`}>
//         <div className={`p-3 max-w-xs rounded-lg text-sm shadow-md text-black bg-indigo-500`}>
//             <strong>{msg.firstName+ ' '+ msg.lastName}</strong>: {msg.text}
//         </div>
//     </div>
// ))}