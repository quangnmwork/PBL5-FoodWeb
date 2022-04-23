import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Footer from '../../../components/Footer/Footer';
import Hero from '../../../components/Hero/Hero';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  const [isShowScrollToTop, setIsShowScrollToTop] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setIsShowScrollToTop(true);
      } else {
        setIsShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [window.scrollY]);
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Box bgColor={'bgMain.100'} position="relative">
      <Navigation />
      <Hero />
      <MainContainer />
      <Footer />
      <IconButton
        icon={<ArrowUpIcon />}
        aria-label="scroll-to-top"
        fontSize="20px"
        position={'sticky'}
        bottom={'2rem'}
        left={'95vw'}
        display={isShowScrollToTop ? 'block' : 'none'}
        onClick={handleScroll}
      ></IconButton>
    </Box>
  );
};

export default HomeContainer;
