import useSWR from 'swr';
import { authAPI } from '../../api/repositoryFactory';

export const useUser = () => {
  const { data, error } = useSWR(`${process.env.REACT_APP_NAME_TOKEN}`);
};
