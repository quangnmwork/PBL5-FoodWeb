import { Box } from '@chakra-ui/react';
import CartMain from '../../../components/Cart/CartMain';
import Navigation from '../../../components/Navigation/Navigation';

const CartContainer = () => {
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <CartMain />
    </Box>
  );
};

export default CartContainer;
