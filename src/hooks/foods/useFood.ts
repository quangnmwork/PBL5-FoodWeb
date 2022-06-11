/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import axiosClient from '../../api/repository';

export const useFood = (idFood: number) => {
  // console.log(`${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`);
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Foods/forSeller/${idFood}`,
    { refreshInterval: 5000 }
  );
  return { data, error, mutate };
};
