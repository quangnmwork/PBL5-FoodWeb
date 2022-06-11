/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import useFoodSeller from '../../hooks/foods/useFoodSeller';
import { User } from '../../models/User.model';
import SellerFoodItem from './SellerFoodItem';

const SellerFoods = (props: Partial<User>) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { foods, loading, hasMore } = useFoodSeller(
    parseInt(props.idUser!),
    pageNumber
  );
  const observer = useRef<null | IntersectionObserver>(null);

  const lastFoodElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // console.log(entries[0].isIntersecting, 'Intersecting', hasMore);
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pageNumber]
  );
  return (
    <Flex flexDirection={'column'}>
      <Box
        borderBottom={'1px solid'}
        borderBottomColor={'borderColor.100'}
        fontWeight={'bold'}
      >
        <Text pl={'1rem'} py={'1rem'}>
          Thực đơn của quán
        </Text>
      </Box>
      <Box>
        {foods.length > 0
          ? foods.map((food, index) => {
              if (foods.length === index + 1) {
                return (
                  <SellerFoodItem
                    ref={lastFoodElementRef}
                    food={food}
                    key={index}
                  />
                );
              } else {
                return <SellerFoodItem food={food} key={index} />;
              }
            })
          : null}
      </Box>
    </Flex>
  );
};

export default SellerFoods;
