import { Route } from 'react-router-dom';
import { RoutesConfig } from '../models/RoutesConfig.model';

const RenderRoutes = (routesConfig: RoutesConfig[]) => {
  //   console.log(
  //     routesConfig.map(({ path, component }) => (
  //       <Route path={path} element={component} key={path}></Route>
  //     ))
  //   );
  return routesConfig.map(({ path, component }) => (
    <Route path={path} element={component} key={path}></Route>
  ));
};

export default RenderRoutes;
