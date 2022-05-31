import { Routes } from 'react-router-dom';
import AuthRoutes from './pages/authentication/routes';
import HomeRoutes from './pages/home/routes';
import UserRoutes from './pages/user/routes';
import FoodRoutes from './pages/food/routes';
import { CartRoutes } from './pages/cart/routes';
import { RoutesNotFound } from './pages/404/routes';
import SellerRoutes from './pages/seller/routes';
import RenderRoutes from './utils/RenderRoutes';
function App() {
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
}

export default App;
