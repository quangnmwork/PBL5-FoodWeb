import { Box, Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useState, useRef, useCallback } from 'react';

import useSellerFood from '../../hooks/foods/useSellerFood';
import SellerFoodItemManage from './SellerFoodItemManage';

const SellerFoodsManage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { foods, loading, hasMore, error } = useSellerFood(pageNumber);
  console.log(foods);
  const observer = useRef<null | IntersectionObserver>(null);
  const lastFoodElementRef = useCallback(
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
    <SimpleGrid columns={6} spacing={'1rem'}>
      {!error && hasMore && foods.length ? (
        foods.map((food, index) => {
          if (foods.length === index + 1) {
            return (
              <SellerFoodItemManage
                ref={lastFoodElementRef}
                food={food}
                key={index}
              />
            );
          } else {
            return <SellerFoodItemManage food={food} key={index} />;
          }
        })
      ) : error ? (
        <Flex justifyContent={'center'} width={'100%'} mt={'2rem'}>
          {loading || (
            <Spinner
              color={'main.200'}
              thickness="5px"
              speed={'0.65s'}
              size={'md'}
            />
          )}
        </Flex>
      ) : null}
      {!hasMore && !loading ? (
        <Box fontWeight={'bold'}>Quán bạn chưa có món ăn nào</Box>
      ) : null}
    </SimpleGrid>
  );
};

export default SellerFoodsManage;
