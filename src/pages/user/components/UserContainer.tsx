import { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import GroupContainer from '../../../components/Admin/Group/GroupContainer';
import UserManageContainer from '../../../components/Admin/User/UserManageContainer';
import HistoryOrderMain from '../../../components/HistoryOrder/HistoryOrderMain';
import Loading from '../../../components/layout/Loading';
import Profile from '../../../components/Profile/Profile';
import ProfileSecurity from '../../../components/Profile/ProfileSecurity';
import SellerFoodsManage from '../../../components/SellerProfile/SellerFoodsManage';
import ShipperAllOrder from '../../../components/Shipper/All/ShipperAllOrder';
import MyShip from '../../../components/Shipper/Order/MyShip';

const Sidebar = lazy(() => import('../../../components/Sidebar/Sidebar'));
import { useUser } from '../../../hooks/authentication/useUser';
import clientStorage from '../../../utils/clientStorage';

const UserContainer = () => {
  const { data, error } = useUser(0);
  // console.log(data);
  const location = useLocation();
  return (
    <>
      {data ? (
        !error && clientStorage.getClientStorage().getToken() ? (
          <Suspense fallback={<Loading />}>
            <Sidebar userData={data} error={error}>
              {location.pathname == '/user/profile' ? (
                <Profile userData={data} />
              ) : null}
              {location.pathname == '/user/security' ? (
                <ProfileSecurity />
              ) : null}
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
              {location.pathname == '/user/group-manage' &&
              data &&
              data.nameGroup == 'Admin' ? (
                <GroupContainer />
              ) : null}
            </Sidebar>
          </Suspense>
        ) : (
          <Navigate to={'/'} />
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserContainer;
