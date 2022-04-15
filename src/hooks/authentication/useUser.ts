/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import { userAPI } from '../../api/repositoryFactory';

const fetcher = (_: string) => userAPI.getUserProfile().then((res) => res.data);

export const useUser = () => {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`,
    fetcher,
    { refreshInterval: 1000 }
  );

  return { data, error };
};
