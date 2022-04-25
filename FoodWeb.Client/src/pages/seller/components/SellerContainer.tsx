import { Box } from '@chakra-ui/react';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Navigation from '../../../components/Navigation/Navigation';
import SellerMain from '../../../components/Seller/SellerMain';
import useWatchScroll from '../../../hooks/utils/useWatchScroll';

const SellerContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <SellerMain />
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default SellerContainer;
