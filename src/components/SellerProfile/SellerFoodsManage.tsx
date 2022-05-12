import { Text, Flex, SimpleGrid, Divider } from '@chakra-ui/react';
import { useState, useRef, useCallback, useEffect } from 'react';

import useSellerFood from '../../hooks/foods/useSellerFood';
import SellerFoodItemManage from './SellerFoodItemManage';
import SellerFoodPost from './SellerFoodPost';

const SellerFoodsManage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reiceiveFood, setReiceveFood] = useState<number>(0);
  const { foods, loading, hasMore, error } = useSellerFood(
    pageNumber,
    reiceiveFood
  );

  // console.log(foods);
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

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setPageNumber(1);
  }, [reiceiveFood]);

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
        <SellerFoodPost
          onCreate={(idFood: number) => {
            setReiceveFood(idFood);
          }}
        />
      </Flex>
      <Divider height={'2px'} mb={'.5rem'} />
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
