import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { categories } from '../../utils/constants';
import Logo from '../Logo/Logo';

interface FoodHomeCategoryProps {
  passDataToParent: any;
}

const FoodHomeCategory = (props: FoodHomeCategoryProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>('Đồ ăn');
  // useEffect(() => {
  //   props.passDataToParent(currentCategory);
  // }, []);
  return (
    <Box bgColor={'white'} flexBasis={'15rem'} position={'sticky'} top={'5rem'}>
      <Flex
        as={'div'}
        alignItems={'center'}
        justifyContent={'center'}
        py={'.5rem'}
        px={'.5rem'}
      >
        <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
        <Text fontWeight={'bold'}>Khám phá</Text>
      </Flex>
      {categories.map((category) => (
        <Box
          id={`${category.idCategory}`}
          key={category.idCategory}
          cursor={'pointer'}
          pl={'1rem'}
          py={'0.7rem'}
          borderBottom={'1px solid'}
          borderBottomColor={'main.100'}
          transition={'all .3s'}
          _hover={{ backgroundColor: 'main.100', color: 'white' }}
          backgroundColor={
            category.nameCategory == currentCategory ? 'main.100' : ''
          }
          onClick={() => {
            props.passDataToParent(category.nameCategory);
            setCurrentCategory(category.nameCategory);
          }}
        >
          {category.nameCategory}
        </Box>
      ))}
    </Box>
  );
};

export default FoodHomeCategory;
