import React from 'react';
import Profile from '../../../components/Profile/Profile';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useUser } from '../../../hooks/authentication/useUser';

const UserContainer = () => {
  const { data, error } = useUser();
  return (
    <Sidebar userData={data} error={error}>
      <Profile userData={data} />
    </Sidebar>
  );
};

export default UserContainer;
