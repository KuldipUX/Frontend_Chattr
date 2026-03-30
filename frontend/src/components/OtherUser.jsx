import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const selectedUserHandler = (user) => {
    console.log(user);
    dispatch(setSelectedUser(user));
  };

  // 🔥 fallback avatar generator
  const getAvatar = () => {
    if (!user?.profilePhoto) {
      return `https://ui-avatars.com/api/?name=${user?.fullName}&background=random`;
    }

    // ❌ agar broken / old iran wala link hai
    if (user.profilePhoto.includes("iran.liara")) {
      return `https://ui-avatars.com/api/?name=${user?.fullName}&background=random`;
    }

    return user.profilePhoto;
  };

  return (
    <div className="w-full">
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id?.toString() === user?._id?.toString()
            ? "bg-white"
            : ""
        } relative flex items-center gap-3 p-3 cursor-pointer 
        rounded-md transition-all duration-200 hover:bg-white`}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-700">
            <img
              src={getAvatar()}
              alt="profile"
              className="w-full h-full object-cover"
              
              // 🔥 agar image load fail ho jaye
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${user?.fullName}&background=random`;
              }}
            />
          </div>

          {/* Online dot */}
          <span
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
            rounded-full border-2 border-zinc-900"
          ></span>
        </div>

        {/* User Info */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-[15px]">
            {user?.fullName || "Unknown User"}
          </p>
          <p className="text-xs text-zinc-400">Active now</p>
        </div>
      </div>

      <div className="divider my-0 py-0"></div>
    </div>
  );
};

export default OtherUser;