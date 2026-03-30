import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setUser({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
   

  };
  return (
    <div className="">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>

        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base font-medium text-white">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="  w-full h-10 px-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-medium text-white">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="  w-full h-10 px-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-medium text-white">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="  w-full h-10 px-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-medium text-white">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="  w-full h-10 px-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center justify-center my-4 gap-10">
            <div className="flex items-center  gap-2">
              <p className="text-base font-medium text-white">Male</p>
              <input
                type="radio"
                name="gender"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="h-5 w-5 appearance-none rounded border border-white  checked:bg-black  checked:border-black relative focus:outline-none 
               focus:ring-2 focus:ring-blue-400 before:content-['✓'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white before:text-sm
               checked:before:opacity-100 before:opacity-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium text-white">Female</p>
              <input
                type="radio"
                name="gender"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="h-5 w-5 appearance-none rounded border border-white  checked:bg-black  checked:border-black relative focus:outline-none 
               focus:ring-2 focus:ring-blue-400 before:content-['✓'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white before:text-sm
               checked:before:opacity-100 before:opacity-0"
              />
            </div>
          </div>

          <div className="w-full mx-auto flex items-center text-center">
            <p className="text-center text-white">Already have an account?</p>
            <Link to="/login" className="text-green-500 font-medium">SignIn</Link>
          </div>

          <div>
            {" "}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800 transition"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
