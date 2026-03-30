import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../../../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          https://backend-chattar.onrender.com/api/v1/message/get/${selectedUser._id}`
        );

        console.log("FULL RESPONSE:", res.data);

        // ✔ API gives an ARRAY, so directly set it
        dispatch(setMessages(res.data));

      } catch (error) {
        console.log("Messages error:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
