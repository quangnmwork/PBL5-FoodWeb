/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import clientStorage from '../../utils/clientStorage';

import { User } from './../../models/User.model';

export const useUser = (timeRefreshInterval?: number) => {
  let condition = false;
  if (clientStorage.getClientStorage().getToken()) {
    condition = true;
  }

  const options = timeRefreshInterval ? timeRefreshInterval : 0;

  const { data, error, mutate, isValidating } = useSWR<User>(
    condition ? `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser` : null,
    { refreshInterval: options }
  );

  return { data, error, mutate, isValidating };
};
