import { Box, Flex, Text } from '@chakra-ui/react';
import { categories } from '../../utils/constants';
import Logo from '../Logo/Logo';

const FoodHomeCategory = () => {
  return (
    <Box bgColor={'white'} flexBasis={'20%'}>
      <Flex alignItems={'center'} justifyContent={'center'} py={'.5rem'}>
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
        >
          {category.nameCategory}
        </Box>
      ))}
    </Box>
  );
};

export default FoodHomeCategory;
