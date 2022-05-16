import useSWR from 'swr';
import axiosClient from '../../api/repository';
const fetcher = (url: string) => axiosClient.post(url).then((res) => res.data);
export const useCheckban = () => {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Users/checkBan`,
    fetcher,
    { refreshInterval: 500 }
  );
  return { data, error };
};
