import { RoutesConfig } from '../../models/RoutesConfig.model';
import HomeContainer from './components/HomeContainer';
const HomeRoutes: RoutesConfig[] = [
  {
    path: '/',
    component: <HomeContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: false,
    specificRole: ['Customer']
  }
];
export default HomeRoutes;
