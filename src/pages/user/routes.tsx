import { RoutesConfig } from '../../models/RoutesConfig.model';
import UserContainer from './components/UserContainer';

const UserRoutes: RoutesConfig[] = [
  {
    path: '/user-profile',
    component: <UserContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true
  }
];
export default UserRoutes;
