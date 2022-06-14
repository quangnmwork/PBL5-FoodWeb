import { Box } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Loading from '../../../components/layout/Loading';
const Navigation = lazy(
  () => import('../../../components/Navigation/Navigation')
);
const SellerMain = lazy(() => import('../../../components/Seller/SellerMain'));
import useWatchScroll from '../../../hooks/utils/useWatchScroll';

const SellerContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Suspense fallback={<Loading />}>
        <Navigation />
        <SellerMain />
      </Suspense>
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default SellerContainer;
