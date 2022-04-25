import { RoutesConfig } from '../../models/RoutesConfig.model';
import SellerContainer from './components/SellerContainer';

const SellerRoutes: RoutesConfig[] = [
  {
    path: '/seller/:id',
    component: <SellerContainer />,
    redirectWhenAlreadyHasUser: false,
    needProtected: true,
    specificRole: ['Customer']
  }
];
export default SellerRoutes;
