import { Box } from '@chakra-ui/react';
import Footer from '../../../components/Footer/Footer';
import Hero from '../../../components/Hero/Hero';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  return (
    <Box bgColor={'bgMain.100'}>
      <Navigation />
      <Hero />
      <MainContainer />
      <Footer />
    </Box>
  );
};

export default HomeContainer;
