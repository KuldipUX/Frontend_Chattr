import React from "react";
import { IoSearch } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full p-3">
      <form
        action=""
        className="flex flex-col gap-3 p-4 rounded-xl 
               backdrop-blur-md 
               border border-white/60 shadow-sm"
      >
        {/* Search Input + Button */}
        <div className="flex items-center gap-2 w-full">
  <input
    className="input input-bordered rounded-xl flex-1 
      bg-white/90 backdrop-blur-sm 
      placeholder-gray-500 text-gray-900
      border border-gray-300
      px-4 py-2
      shadow-sm
      focus:outline-none focus:border-green-500
      focus:ring-2 focus:ring-green-200
      transition-all duration-200"
    type="text"
    placeholder="Search..."
  />

  <button
    type="submit"
    className="w-11 h-11 flex items-center justify-center
      rounded-xl
      bg-gradient-to-br from-[#063b2b] to-[#0f5e3d]
      hover:from-[#07543b] hover:to-[#148a5a]
      text-white
      shadow-md hover:shadow-lg
      transition-all duration-200 active:scale-95"
  >
    <IoSearch className="text-lg" />
  </button>
</div>

        {/* Users List */}
        <div
          className="h-[400px] overflow-y-auto pr-1 
                 scrollbar-thin scrollbar-thumb-gray-300 
                 scrollbar-track-transparent"
        >
          <OtherUsers />
        </div>
      </form>
      <div className="mt-2 bg-white p-2 rounded-lg inline-block mb-2">
  <button
    onClick={logoutHandler}
    className="logout-btn "
  >
    Logout
  </button>
</div>
    </div>
  );
};

export default Sidebar;
