import { Box, Text, Icon } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Cart = () => {
  return (
    <Box marginRight={'1rem'} position={'relative'}>
      <Icon as={AiOutlineShoppingCart} w={8} h={8} />
      <Box
        right={'-1'}
        top={'-1'}
        position={'absolute'}
        backgroundColor={'main.100'}
        width={'1.2rem'}
        height={'1.2rem'}
        borderRadius={'50%'}
      >
        <Text
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'.8em'}
        >
          1
        </Text>
      </Box>
    </Box>
  );
};

export default Cart;
