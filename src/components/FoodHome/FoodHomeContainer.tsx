import { Flex } from '@chakra-ui/react';
import FoodHomeCategory from './FoodHomeCategory';
import FoodHomeMain from './FoodHomeMain';

const FoodHomeContainer = () => {
  return (
    <Flex my={'2rem'}>
      <FoodHomeCategory />
      <FoodHomeMain />
    </Flex>
  );
};

export default FoodHomeContainer;
