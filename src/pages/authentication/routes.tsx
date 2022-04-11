import { RoutesConfig } from '../../models/RoutesConfig.model';
import FormContainer from './components/FormContainer';
const AuthRoutes: RoutesConfig[] = [
  {
    path: '/auth/sign-in',
    component: <FormContainer />
  },
  {
    path: '/auth/sign-up',
    component: <FormContainer />
  }
];
export default AuthRoutes;
