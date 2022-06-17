import useSWR from 'swr';
import axiosClient from '../../api/repository';

const fetcher = (url: string) => axiosClient.post(url).then((res) => res.data);
export const useCheckban = () => {
  const { data, error, mutate } = useSWR(`Users/checkBan`, fetcher, {
    refreshInterval: 0
  });
  return { data, error, mutate };
};
