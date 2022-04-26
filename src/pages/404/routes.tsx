import { RoutesConfig } from '../../models/RoutesConfig.model';
import Page404 from './components/404';

export const RoutesNotFound: RoutesConfig[] = [
  {
    component: <Page404 />,
    needProtected: false,
    path: '*',
    redirectWhenAlreadyHasUser: false
  }
];
