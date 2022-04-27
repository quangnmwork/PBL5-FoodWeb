import { Routes } from 'react-router-dom';
import RenderRoutes from '../../utils/RenderRoutes';
import { RoutesNotFound } from '../404/routes';
import AuthRoutes from '../authentication/routes';
import { CartRoutes } from '../cart/routes';
import FoodRoutes from '../food/routes';
import HomeRoutes from '../home/routes';
import SellerRoutes from '../seller/routes';
import UserRoutes from '../user/routes';
const OverallLayout = () => {
  return (
    <Routes>
      {RenderRoutes(AuthRoutes)}
      {RenderRoutes(HomeRoutes)}
      {RenderRoutes(UserRoutes)}
      {RenderRoutes(SellerRoutes)}
      {RenderRoutes(FoodRoutes)}
      {RenderRoutes(CartRoutes)}
      {RenderRoutes(RoutesNotFound)}
    </Routes>
  );
  // return <Navigation />;
};

export default OverallLayout;
