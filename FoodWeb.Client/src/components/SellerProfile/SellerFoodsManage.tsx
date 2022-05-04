import { AddIcon } from '@chakra-ui/icons';
import { Text, Flex, SimpleGrid, Button, Divider } from '@chakra-ui/react';
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
    <Flex flexDirection={'column'}>
      <Flex
        my={'.5rem'}
        justifyContent={'space-between'}
        width={'100%'}
        className={'test'}
        alignItems={'center'}
      >
        <Text fontWeight={'bold'}>Danh sách món ăn</Text>
        <Button leftIcon={<AddIcon />}>Thêm món mới</Button>
      </Flex>
      <Divider />
      <SimpleGrid columns={6} spacing={'1rem'}>
        {!error && foods.length
          ? foods.map((food, index) => {
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
          : null}
      </SimpleGrid>
    </Flex>
  );
};

export default SellerFoodsManage;
