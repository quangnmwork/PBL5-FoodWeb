/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import { userAPI } from '../../api/repositoryFactory';

const fetcher = (_: string) => userAPI.getUserProfile().then((res) => res.data);

export const useUser = () => {
  // console.log(`${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`);
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`,
    fetcher,
    { refreshInterval: 500 }
  );
  return { data, error, mutate };
};
