import { RoutesConfig } from '../../models/RoutesConfig.model';
import HomeContainer from './components/HomeContainer';
import SearchContainer from './components/SearchContainer';
const HomeRoutes: RoutesConfig[] = [
  {
    path: '/',
    component: <HomeContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: false,
    specificRole: ['Customer']
  },
  {
    path: '/search',
    component: <SearchContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: false,
    specificRole: ['Customer']
  }
];
export default HomeRoutes;
