/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';

import { User } from './../../models/User.model';

export const useUser = (timeRefreshInterval?: number) => {
  const options = timeRefreshInterval ? timeRefreshInterval : 0;

  const { data, error, mutate, isValidating } = useSWR<User>(
    `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`,
    { refreshInterval: options }
  );

  return { data, error, mutate, isValidating };
};
