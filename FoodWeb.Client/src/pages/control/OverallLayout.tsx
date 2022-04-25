import { Routes } from 'react-router-dom';
import RenderRoutes from '../../utils/RenderRoutes';
import AuthRoutes from '../authentication/routes';
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
    </Routes>
  );
  // return <Navigation />;
};

export default OverallLayout;
