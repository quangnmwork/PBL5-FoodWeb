import { Flex, Stack } from '@chakra-ui/react';

import { useCart } from '../../services/cart/useCart';
import CustomCard from '../Card/CustomCard';
import CartItem from './CartItem';
import { CartOrderSummary } from './CartOrderSummary';

const CartMain = () => {
  const cart = useCart();
  return (
    <CustomCard
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
      mt={'2rem'}
      borderRadius={'1rem'}
    >
      <Stack direction={{ base: 'column', lg: 'row' }}>
        <Flex flexDirection={'column'} flexBasis={'100%'} gap={'1rem'}>
          {cart.getCart().map((cartItem, index) => (
            <CartItem
              id={cartItem.id}
              imageFood={cartItem.imageFood}
              key={index}
              nameFood={cartItem.nameFood}
              numberFood={cartItem.numberFood}
              priceFood={cartItem.priceFood}
            />
          ))}
        </Flex>
        <CartOrderSummary />
      </Stack>
    </CustomCard>
  );
};

export default CartMain;
