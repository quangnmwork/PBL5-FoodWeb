import useSWR from 'swr';
import { Food } from '../../models/Food.model';
import { MAX_TIME } from '../../utils/constants';

const useSellerFood = () => {
  const { data, error, mutate } = useSWR<Food[]>('Foods/getListFood', {
    refreshInterval: MAX_TIME
  });
  return {
    data,
    error,
    mutate
  };
};
export default useSellerFood;
