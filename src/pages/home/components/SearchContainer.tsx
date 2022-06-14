import { Box } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
const FoodHomeMain = lazy(
  () => import('../../../components/FoodHome/FoodHomeMain')
);
import Navigation from '../../../components/Navigation/Navigation';
import SpinnerCustom from '../../../components/Spinner/SpinnerCustom';
const SellerSearchMain = lazy(
  () => import('../../../components/SellerSearch/SellerSearchMain')
);
import useWatchScroll from '../../../hooks/utils/useWatchScroll';

const SearchContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  const [params] = useSearchParams();
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <Box maxW={'6xl'} mx={'auto'} my={'3rem'}>
        {params.get('nameCategory') ? (
          <Suspense fallback={<SpinnerCustom />}>
            <FoodHomeMain
              activeCategory={params.get('nameCategory') || ''}
              keyName={params.get('keyName') || ''}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<SpinnerCustom />}>
            <SellerSearchMain keyName={params.get('keyName') || ''} />
          </Suspense>
        )}
      </Box>
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default SearchContainer;
