import { Box } from '@chakra-ui/react';
import FoodMain from '../../../components/Food/FoodMain';
import Navigation from '../../../components/Navigation/Navigation';

const FoodContainer = () => {
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <FoodMain />
    </Box>
  );
};

export default FoodContainer;
