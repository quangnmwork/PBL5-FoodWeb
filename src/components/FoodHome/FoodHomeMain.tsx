import { SimpleGrid } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import useFoodFetch from '../../hooks/foods/useFoodFetch';

const FoodHomeMain = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { foods, loading, error, hasMore } = useFoodFetch('Đồ ăn', '', 1);
  console.log(foods);
  const observer = useRef<null | IntersectionObserver>(null);
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <SimpleGrid ml={'2rem'} columns={5}>
      {foods.map((food, index) => {
        if (foods.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={food.idFood}>
              {food.nameFood}
            </div>
          );
        } else {
          return <div key={food.idFood}>{food.nameFood}</div>;
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </SimpleGrid>
  );
};

export default FoodHomeMain;
