import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../redux/messageSlice';
import { socket } from "../App";

const SendInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const { selectedUser, authUser } = useSelector(store => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // 🔥 API call (DB save)
      const res = await axios.post(
        `https://backend-chattar.onrender.com/api/v1/message/send/${selectedUser?._id}`,
        { message }
      );

      const newMessage = res.data.newMessage;

      // 🔥 REALTIME SEND
      socket.emit("send_message", {
        ...newMessage,
        receiverId: selectedUser._id,
      });

      // 🔥 INSTANT UI UPDATE (sender side)
      dispatch(addMessage(newMessage));

      // 🔥 clear input
      setMessage("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          placeholder='Send a message...'
          className='border text-sm rounded-lg block w-full p-3 border-zinc-200 bg-gray-600 text-white'
        />
        <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4'>
          <IoSend />
        </button>
      </div>
    </form>
  )
}

export default SendInput;
