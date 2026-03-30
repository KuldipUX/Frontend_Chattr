import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "./hooks/useGetMessages";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../App";
import { addMessage } from "../../redux/messageSlice";

const Messages = () => {
  const dispatch = useDispatch();
  useGetMessages();

  const { messages } = useSelector((store) => store.message);
  const { selectedUser, authUser } = useSelector((store) => store.user);

  const lastMessageRef = useRef();

  // 🔥 RECEIVE MESSAGE (FILTERED)
  useEffect(() => {
    const handleMessage = (data) => {
      console.log("New message:", data);

      // ✅ only current chat messages allow
      if (
        data.senderId === selectedUser?._id ||
        data.receiverId === selectedUser?._id
      ) {
        dispatch(addMessage(data));
      }
    };

    socket.on("receive_message", handleMessage);

    return () => socket.off("receive_message", handleMessage);
  }, [dispatch, selectedUser]);

  // 🔥 Auto scroll
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-white text-base font-medium opacity-80">
  Select a user to start chatting 💬
</div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-zinc-900">
      
      {messages?.length === 0 && (
        <div className="flex items-center justify-center h-full text-white text-base font-medium opacity-80">
  No messages yet 👋
</div>
      )}

      {messages?.map((msg, index) =>
        msg ? (
          <div
            key={msg._id || index} // 🔥 fallback added
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={msg} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default Messages;