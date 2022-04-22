import { Box } from '@chakra-ui/react';
import Hero from '../../../components/Hero/Hero';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  return (
    <Box bgColor={'bgMain.100'}>
      <Navigation />
      <Hero />
      <MainContainer />
    </Box>
  );
};

export default HomeContainer;
