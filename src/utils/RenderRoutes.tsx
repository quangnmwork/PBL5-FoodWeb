import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../hooks/authentication/useUser';
import { RoutesConfig } from '../models/RoutesConfig.model';
import { permissionGuard } from './authUtils';
import { checkObjectExist } from './checkObjectNull';

const RenderRoutes = (routesConfig: RoutesConfig[]) => {
  const { data, error } = useUser();
  return routesConfig.map(
    ({
      path,
      component,
      redirectWhenAlreadyHasUser,
      needProtected,
      specificRole
    }) => {
      // console.log(needProtected && data == undefined);

      // console.log(!(data && redirectWhenAlreadyHasUser));
      if (needProtected && !checkObjectExist(data) && error) {
        return (
          <Route
            path={path}
            element={<Navigate to={'/auth/sign-in'} replace={true} />}
            key={path}
          ></Route>
        );
      }
      // console.log(
      //   'Permission',
      //   permissionGuard(specificRole!, data?.nameGroup)
      // );
      console.log('Object', checkObjectExist(data));
      console.log('Redirect', redirectWhenAlreadyHasUser);
      if (needProtected && data && !error && specificRole) {
        return (
          <Route
            path={path}
            element={
              checkObjectExist(data) &&
              !redirectWhenAlreadyHasUser &&
              !permissionGuard(specificRole, data.nameGroup) ? (
                <Navigate to={'/'} replace={true} />
              ) : (
                component
              )
            }
            key={path}
          ></Route>
        );
      }
      return (
        <Route
          path={path}
          element={
            checkObjectExist(data) && redirectWhenAlreadyHasUser && !error ? (
              <Navigate to={'/'} replace={true} />
            ) : (
              component
            )
          }
          key={path}
        ></Route>
      );
    }
  );
};

export default RenderRoutes;
