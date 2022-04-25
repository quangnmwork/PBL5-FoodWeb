import { Box } from '@chakra-ui/react';
import Navigation from '../../../components/Navigation/Navigation';
import SellerMain from '../../../components/Seller/SellerMain';

const SellerContainer = () => {
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <SellerMain />
    </Box>
  );
};

export default SellerContainer;
