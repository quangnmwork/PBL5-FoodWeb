import { RoutesConfig } from '../../models/RoutesConfig.model';
import FoodContainer from './components/FoodContainer';

const FoodRoutes: RoutesConfig[] = [
  {
    path: '/food/:id',
    component: <FoodContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Customer']
  }
];
export default FoodRoutes;
