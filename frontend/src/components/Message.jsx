import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const isMine = message.senderId === authUser?._id;

  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"}`}>
      
      <div
        className={`max-w-xs md:max-w-sm px-4 py-3 rounded-2xl shadow-md relative
          ${isMine ? "bg-blue-600 text-white" : "bg-zinc-800 text-white"}`}
      >
        <p className="text-sm leading-snug">{message.message}</p>

        <span className="text-[8px] text-zinc-300 absolute bottom-1 right-2">
          {/* Later replace with message.createdAt formatted */}
          10:45 PM
        </span>
      </div>
    </div>
  );
};

export default Message;
