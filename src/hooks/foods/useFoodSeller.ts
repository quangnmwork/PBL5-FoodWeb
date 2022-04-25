import { useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';
import { Food } from '../../models/Food.model';

const useFoodSeller = (idUser: number, pageNumber: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [foods, setFoods] = useState<Food[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let fetch = true;
    userAPI.getAllFoodsOfSeller(idUser, pageNumber).then((res) => {
      if (fetch) {
        setFoods((prevFoods) => {
          console.log([...new Set([...prevFoods, ...res.data])]);
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
  return { loading, error, foods, hasMore };
};

export default useFoodSeller;
