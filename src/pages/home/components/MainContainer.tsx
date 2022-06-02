import { Container } from '@chakra-ui/react';
import FoodHomeContainer from '../../../components/FoodHome/FoodHomeContainer';
import SellerSection from '../../../components/SellerSection/SellerSection';

const MainContainer = () => {
  return (
    <Container mt={'2rem'} maxWidth={'7xl'}>
      <SellerSection />
      <FoodHomeContainer />
    </Container>
  );
};

export default MainContainer;
