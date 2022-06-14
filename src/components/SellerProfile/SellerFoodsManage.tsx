import { Text, Flex, SimpleGrid, Divider } from '@chakra-ui/react';

import useSellerFood from '../../hooks/foods/useSellerFood';
import SellerFoodItemManage from './SellerFoodItemManage';
import SellerFoodPost from './SellerFoodPost';

const SellerFoodsManage = () => {
  const { data, error } = useSellerFood();

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
        <SellerFoodPost />
      </Flex>
      <Divider height={'2px'} mb={'.5rem'} />
      <SimpleGrid columns={6} spacing={'1rem'}>
        {!error && data
          ? data.map((food, index) => (
              <SellerFoodItemManage food={food} key={index} />
            ))
          : null}
      </SimpleGrid>
    </Flex>
  );
};

export default SellerFoodsManage;
