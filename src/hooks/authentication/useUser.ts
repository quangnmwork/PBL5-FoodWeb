/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import clientStorage from '../../utils/clientStorage';

import { User } from './../../models/User.model';

export const useUser = (timeRefreshInterval?: number) => {
  // console.log(`${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`);
  let condition = false;
  if (clientStorage.getClientStorage().getToken()?.length) {
    condition = true;
  }

  const options = timeRefreshInterval ? timeRefreshInterval : 500;

  const { data, error, mutate, isValidating } = useSWR<User>(
    condition ? `${process.env.REACT_APP_DOMAIN}Users/GetProfileUser` : null,
    { refreshInterval: options }
  );

  return { data, error, mutate, isValidating };
};
