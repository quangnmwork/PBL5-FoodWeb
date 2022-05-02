import { RoutesConfig } from '../../models/RoutesConfig.model';
import UserContainer from './components/UserContainer';

const UserRoutes: RoutesConfig[] = [
  {
    path: '/user/profile',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Shipper', 'Customer']
  },
  {
    path: '/user/security',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Shipper', 'Customer']
  },
  {
    path: '/user/history-order',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Customer']
  },
  {
    path: '/user/not-ship',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Shipper']
  },
  {
    path: '/user/my-ship',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Shipper']
  }
];
export default UserRoutes;
