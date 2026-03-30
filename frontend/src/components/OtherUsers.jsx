import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from './hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {

  // custom hook
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);

  // early return
  if (!otherUsers) return null;

  return (
    <div className='overflow-auto flex-1'>
      {otherUsers?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
