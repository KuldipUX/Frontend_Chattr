import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setAuthUser } from "../../redux/userSlice";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
      setUser({
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={onSubmitHandler} action="">
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
              placeholder="username"
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
              className="  w-full h-10 px-3 border font-regular border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 "
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="w-full mx-auto flex items-center text-center ">
            <p className="text-center text-white">Don't have an account?</p>
            <Link to="/register" className="text-green-500 font-medium">SignUp</Link>
          </div>

          <div>
            {" "}
            <button className="w-full bg-black font-bold text-white py-2 rounded-lg mt-4 hover:bg-gray-800 transition">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
