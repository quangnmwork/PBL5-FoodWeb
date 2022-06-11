import useSWR from 'swr';
import axiosClient from '../../api/repository';
import { MAX_TIME } from '../../utils/constants';
const fetcher = (url: string) => axiosClient.post(url).then((res) => res.data);
export const useCheckban = () => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Users/checkBan`,
    fetcher,
    { refreshInterval: MAX_TIME }
  );
  return { data, error, mutate };
};
