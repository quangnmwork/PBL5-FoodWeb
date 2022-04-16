import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useUser } from '../../../hooks/authentication/useUser';

const UserContainer = () => {
  const { data, error } = useUser();
  return (
    <Sidebar userData={data} error={error}>
      <p>Hello world</p>
    </Sidebar>
  );
};

export default UserContainer;
