import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessageContainer = () => {
  const { selectedUser } = useSelector(store => store.user);

  // 🔥 Avatar fallback function
  const getAvatar = () => {
    if (!selectedUser?.profilePhoto) {
      return `https://ui-avatars.com/api/?name=${selectedUser?.fullName || "User"}&background=random`;
    }

    if (selectedUser.profilePhoto.includes("iran.liara")) {
      return `https://ui-avatars.com/api/?name=${selectedUser?.fullName || "User"}&background=random`;
    }

    return selectedUser.profilePhoto;
  };

  return (
    <div className='md:min-w-[550px] flex flex-col h-full pb-2'>

      {/* Header */}
      <div className='bg-zinc-800 px-4 py-2 flex items-center gap-3 border-b border-zinc-700'>
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-700">
            <img
              src={getAvatar()}
              alt="user"
              className="w-full h-full object-cover"
              
              // 🔥 fallback if image fails
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${selectedUser?.fullName || "User"}&background=random`;
              }}
            />
          </div>

          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
          rounded-full border-2 border-zinc-900"></span>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <p className="font-semibold text-white">
            {selectedUser?.fullName || "Select a user"}
          </p>
          <p className="text-xs text-zinc-400">
            {selectedUser ? "Active now" : "No user selected"}
          </p>
        </div>

      </div>

      {/* Messages */}
      <Messages/>

      {/* Input */}
      <SendInput/>

    </div>
  )
}

export default MessageContainer