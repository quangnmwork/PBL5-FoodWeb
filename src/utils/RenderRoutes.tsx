import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../hooks/authentication/useUser';
import { RoutesConfig } from '../models/RoutesConfig.model';

const RenderRoutes = (routesConfig: RoutesConfig[]) => {
  const { data, error } = useUser();
  return routesConfig.map(
    ({ path, component, redirectWhenAlreadyHasUser, needProtected }) => {
      // console.log(needProtected && data == undefined);
      // console.log(!(data && redirectWhenAlreadyHasUser));
      if (needProtected && !data && error) {
        return (
          <Route
            path={path}
            element={<Navigate to={'/auth/sign-in'} replace={true} />}
            key={path}
          ></Route>
        );
      }
      return (
        <Route
          path={path}
          element={
            !(data && redirectWhenAlreadyHasUser && !error) ? (
              component
            ) : (
              <Navigate to={'/'} replace={true} />
            )
          }
          key={path}
        ></Route>
      );
    }
  );
};

export default RenderRoutes;
