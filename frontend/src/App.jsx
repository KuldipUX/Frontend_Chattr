import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"

export let socket; // 🔥 global socket

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> }
]);

function App() {
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    if (authUser?._id) {
      
      // 🔥 connect socket
      socket = io('http://localhost:8080', {
        withCredentials: true
      });

      // 🔥 join user
      socket.emit("join", authUser._id);

      socket.on("connect", () => {
  console.log("Socket connected:", socket.id); 
});

      // 🔥 cleanup
      return () => {
        socket.disconnect();
      };
    }
  }, [authUser]);

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;