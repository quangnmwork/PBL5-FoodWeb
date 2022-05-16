import useSWR from 'swr';
import axiosClient from '../../api/repository';

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

export const usePermissionDetail = (permissionCode: string) => {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/getPermissionDetailByCode/${permissionCode}`,
    fetcher,
    { refreshInterval: 500 }
  );
  return { data, error };
};
