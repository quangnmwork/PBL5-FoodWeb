/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useSWR from 'swr';
import axiosClient from '../../api/repository';

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

export const useFood = (idFood: number) => {
  // console.log(`${process.env.REACT_APP_DOMAIN}Users/GetProfileUser`);
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Foods/forSeller/${idFood}`,
    fetcher,
    { refreshInterval: 500 }
  );
  return { data, error, mutate };
};
