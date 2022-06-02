import { useEffect, useState } from 'react';
import { foodAPI } from '../../api/repositoryFactory';
import { Food } from '../../models/Food.model';

const useFoodFetch = (
  category: string,
  keyName: string,
  pageNumber: number
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [foods, setFoods] = useState<Food[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    setFoods([]);
  }, [keyName, category]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let fetch = true;
    foodAPI
      .getAllFoodsByPageAndCategory(category, keyName, pageNumber)
      .then((res) => {
        if (fetch) {
          setFoods((prevFoods) => {
            return [...new Set([...prevFoods, ...res.data])];
          });
          setHasMore(res.data.length > 0);
          setLoading(false);
        }
      })
      .catch(() => {
        setHasMore(false);
      });
    return () => {
      fetch = false;
    };
  }, [pageNumber, keyName, category]);
  return { loading, error, foods, hasMore };
};

export default useFoodFetch;
