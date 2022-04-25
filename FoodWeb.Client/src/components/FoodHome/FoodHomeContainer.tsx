import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import FoodHomeCategory from './FoodHomeCategory';
import FoodHomeMain from './FoodHomeMain';

const FoodHomeContainer = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('Đồ ăn');
  return (
    <Flex my={'2rem'} alignItems={'flex-start'} position={'relative'}>
      <FoodHomeCategory
        passDataToParent={(category: string) => {
          setCurrentCategory(category);
        }}
      />
      <FoodHomeMain activeCategory={currentCategory} />
    </Flex>
  );
};

export default FoodHomeContainer;
