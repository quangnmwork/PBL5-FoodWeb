import { RoutesConfig } from '../../models/RoutesConfig.model';
import FormSignUp from './components/FormSignUp';
import FormSignIn from './components/FormSignIn';
const AuthRoutes: RoutesConfig[] = [
  {
    path: '/auth/sign-in',
    component: <FormSignIn />
  },
  {
    path: '/auth/sign-up',
    component: <FormSignUp />
  }
];
export default AuthRoutes;
