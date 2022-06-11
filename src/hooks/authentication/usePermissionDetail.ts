import useSWR from 'swr';
import { MAX_TIME } from '../../utils/constants';

export const usePermissionDetail = (permissionCode: string) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/getPermissionDetailByCode/${permissionCode}`,
    { refreshInterval: MAX_TIME }
  );
  return { data, error, mutate };
};
