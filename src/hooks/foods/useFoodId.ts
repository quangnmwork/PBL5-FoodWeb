import { useState, useEffect } from 'react';
import { foodAPI } from '../../api/repositoryFactory';
import { Food } from '../../models/Food.model';

const useFoodId = (id: number) => {
  const [foodById, setFood] = useState<Food>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let fetch = true;
    setLoading(true);
    foodAPI
      .getFoodById(id.toString())
      .then((res) => {
        if (fetch) {
          setFood(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      fetch = false;
    };
  }, []);
  return { foodById, loading };
};
export default useFoodId;
