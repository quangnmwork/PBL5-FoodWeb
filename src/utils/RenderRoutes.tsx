import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/authentication/useUser';
import { RoutesConfig } from '../models/RoutesConfig.model';
import FormContainer from '../pages/authentication/components/FormContainer';

const RenderRoutes = (routesConfig: RoutesConfig[]) => {
  const { data } = useUser();
  console.log(data);
  return routesConfig.map(
    ({ path, component, redirectWhenAlreadyHasUser, needProtected }) => {
      console.log(needProtected && data == undefined);
      if (needProtected && data == undefined) {
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
            !(data && redirectWhenAlreadyHasUser) ? (
              component
            ) : (
              <Navigate to={'/'} />
            )
          }
          key={path}
        ></Route>
      );
    }
  );
};

export default RenderRoutes;
