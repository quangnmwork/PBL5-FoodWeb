import { Box, Text, Icon } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '../../../services/cart/useCart';
const Cart = () => {
  const cart = useCart();
  return (
    <Box marginRight={'1rem'} position={'relative'}>
      <Icon as={AiOutlineShoppingCart} w={8} h={8} />
      <Box
        right={'-1.5'}
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
          color={'white'}
          fontWeight={'medium'}
        >
          {cart.getLengthCartProducs()}
        </Text>
      </Box>
    </Box>
  );
};

export default Cart;
