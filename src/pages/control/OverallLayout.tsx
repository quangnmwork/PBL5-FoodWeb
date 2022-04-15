import { Routes } from 'react-router-dom';
import RenderRoutes from '../../utils/RenderRoutes';
import AuthRoutes from '../authentication/routes';
import HomeRoutes from '../home/routes';
import UserRoutes from '../user/routes';
const OverallLayout = () => {
  return (
    <Routes>
      {RenderRoutes(AuthRoutes)}
      {RenderRoutes(HomeRoutes)}
      {RenderRoutes(UserRoutes)}
    </Routes>
  );
  // return <Navigation />;
};

export default OverallLayout;
