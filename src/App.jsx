import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";

import Body from './Body';
import Login from './components/Login';
import Signup from './components/Signup';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connection from './components/Connection';
import Request from './components/Request';
import ForgotPassword from './components/ForgotPassword';
import Chat from './components/Chat';

const App = () => {
  return (
    <>
    <Provider store = {appStore}> 
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<Request />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
