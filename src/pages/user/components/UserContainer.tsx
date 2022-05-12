import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserManageContainer from '../../../components/Admin/User/UserManageContainer';
import HistoryOrderMain from '../../../components/HistoryOrder/HistoryOrderMain';
import Profile from '../../../components/Profile/Profile';
import ProfileSecurity from '../../../components/Profile/ProfileSecurity';
import SellerFoodsManage from '../../../components/SellerProfile/SellerFoodsManage';
import ShipperAllOrder from '../../../components/Shipper/All/ShipperAllOrder';
import MyShip from '../../../components/Shipper/Order/MyShip';

import Sidebar from '../../../components/Sidebar/Sidebar';
import { useUser } from '../../../hooks/authentication/useUser';

const UserContainer = () => {
  const { data, error } = useUser();
  const location = useLocation();
  return (
    <>
      {!error ? (
        <Sidebar userData={data} error={error}>
          {location.pathname == '/user/profile' ? (
            <Profile userData={data} />
          ) : null}
          {location.pathname == '/user/security' ? <ProfileSecurity /> : null}
          {location.pathname == '/user/history-order' ? (
            <HistoryOrderMain />
          ) : null}
          {location.pathname == '/user/my-foods' &&
          data &&
          data.nameGroup == 'Seller' ? (
            <SellerFoodsManage />
          ) : null}
          {location.pathname == '/user/not-ship' &&
          data &&
          data.nameGroup == 'Shipper' ? (
            <ShipperAllOrder />
          ) : null}
          {location.pathname == '/user/my-ship' &&
          data &&
          data.nameGroup == 'Shipper' ? (
            <MyShip />
          ) : null}
          {location.pathname == '/user/user-manage' &&
          data &&
          data.nameGroup == 'Admin' ? (
            <UserManageContainer nameGroup={'customer'} />
          ) : null}
          {location.pathname == '/user/shipper-manage' &&
          data &&
          data.nameGroup == 'Admin' ? (
            <UserManageContainer nameGroup={'shipper'} />
          ) : null}
          {location.pathname == '/user/seller-manage' &&
          data &&
          data.nameGroup == 'Admin' ? (
            <UserManageContainer nameGroup={'seller'} />
          ) : null}
        </Sidebar>
      ) : (
        <Navigate to={'/'} replace={true} />
      )}
    </>
  );
};

export default UserContainer;
