import { Box } from '@chakra-ui/react';
import Carousel from '../../../components/Hero/Carousel';
import Navigation from './../../../components/Navigation/Navigation';
const HomeContainer = () => {
  return (
    <Box>
      <Navigation />
      <Carousel />
    </Box>
  );
};

export default HomeContainer;
