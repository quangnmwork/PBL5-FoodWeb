import { Routes } from 'react-router-dom';
import RenderRoutes from '../../utils/RenderRoutes';

import AuthRoutes from '../authentication/routes';
const OverallLayout = () => {
  return <Routes>{RenderRoutes(AuthRoutes)}</Routes>;
  // return <Navigation />;
};

export default OverallLayout;
