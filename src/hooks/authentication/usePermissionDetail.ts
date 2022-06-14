import useSWR from 'swr';

export const usePermissionDetail = (permissionCode: string) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/getPermissionDetailByCode/${permissionCode}`,
    { refreshInterval: 0 }
  );
  return { data, error, mutate };
};
