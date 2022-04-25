import { RoutesConfig } from '../../models/RoutesConfig.model';
import FormContainer from './components/FormContainer';
const AuthRoutes: RoutesConfig[] = [
  {
    path: '/auth/sign-in',
    component: <FormContainer />,
    redirectWhenAlreadyHasUser: true,
    needProtected: false
  },
  {
    path: '/auth/sign-up',
    component: <FormContainer />,
    redirectWhenAlreadyHasUser: true,
    needProtected: false
  }
];
export default AuthRoutes;
