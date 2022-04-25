import { Box } from '@chakra-ui/react';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Footer from '../../../components/Footer/Footer';
import Hero from '../../../components/Hero/Hero';
import useWatchScroll from '../../../hooks/utils/useWatchScroll';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();

  return (
    <Box bgColor={'bgMain.100'} position="relative">
      <Navigation />
      <Hero />
      <MainContainer />
      <Footer />
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default HomeContainer;
