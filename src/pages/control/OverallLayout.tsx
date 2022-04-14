import { Routes } from 'react-router-dom';
import RenderRoutes from '../../utils/RenderRoutes';
import AuthRoutes from '../authentication/routes';
import HomeRoutes from '../home/routes';
const OverallLayout = () => {
  return (
    <Routes>
      {RenderRoutes(AuthRoutes)}
      {RenderRoutes(HomeRoutes)}
    </Routes>
  );
  // return <Navigation />;
};

export default OverallLayout;
