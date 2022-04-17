import React from 'react';
import { useLocation } from 'react-router-dom';
import Profile from '../../../components/Profile/Profile';
import ProfileSecurity from '../../../components/Profile/ProfileSecurity';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useUser } from '../../../hooks/authentication/useUser';

const UserContainer = () => {
  const { data, error } = useUser();
  const location = useLocation();
  return (
    <Sidebar userData={data} error={error}>
      {location.pathname == '/user/profile' ? (
        <Profile userData={data} />
      ) : null}
      {location.pathname == '/user/security' ? <ProfileSecurity /> : null}
    </Sidebar>
  );
};

export default UserContainer;
