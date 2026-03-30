import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../../../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          "https://backend-chattar.onrender.com/api/v1/user/"
        );

        console.log(res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
