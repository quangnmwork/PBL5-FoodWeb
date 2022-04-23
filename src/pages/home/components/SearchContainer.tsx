import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import FoodHomeMain from '../../../components/FoodHome/FoodHomeMain';
import Navigation from '../../../components/Navigation/Navigation';
import useWatchScroll from '../../../hooks/utils/useWatchScroll';

const SearchContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  const [params] = useSearchParams();
  console.log(params.get('nameCategory'), params.get('keyName'));
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <Box maxW={'6xl'} mx={'auto'} my={'3rem'}>
        <FoodHomeMain
          activeCategory={params.get('nameCategory') || 'Đồ ăn'}
          keyName={params.get('keyName') || ''}
        />
      </Box>
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default SearchContainer;
