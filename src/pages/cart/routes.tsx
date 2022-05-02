import { RoutesConfig } from '../../models/RoutesConfig.model';
import CartContainer from './components/CartContainer';
export const CartRoutes: RoutesConfig[] = [
  {
    component: <CartContainer />,
    needProtected: true,
    path: '/my-cart',
    redirectWhenAlreadyHasUser: false,
    specificRole: ['Customer']
  }
];
