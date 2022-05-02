/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import { userAPI } from '../../api/repositoryFactory';

const fetcher = (_: string) => userAPI.getUserProfile().then((res) => res.data);

export const useUser = (needRefresh = true) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`,
    fetcher,
    needRefresh ? { refreshInterval: 1000 } : {}
  );

  return { data, error, mutate };
};
