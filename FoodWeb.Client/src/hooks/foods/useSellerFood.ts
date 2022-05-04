import { useEffect, useState } from 'react';
import { sellerAPI } from '../../api/repositoryFactory';
import { Food } from '../../models/Food.model';

const useSellerFood = (pageNumber: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setFoods([]);
  }, []);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let fetch = true;
    sellerAPI.getListFoods(pageNumber).then((res) => {
      if (fetch) {
        setFoods((prevFoods) => {
          // console.log([...new Set([...prevFoods, ...res.data])]);
          return [...new Set([...prevFoods, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      }
    });
    return () => {
      fetch = false;
    };
  }, [pageNumber]);
  return { error, loading, foods, hasMore };
};
export default useSellerFood;
