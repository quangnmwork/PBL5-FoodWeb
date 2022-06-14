import { Container } from '@chakra-ui/react';
import { lazy } from 'react';
const FoodHomeContainer = lazy(
  () => import('../../../components/FoodHome/FoodHomeContainer')
);
const SellerSection = lazy(
  () => import('../../../components/SellerSection/SellerSection')
);

const MainContainer = () => {
  return (
    <Container mt={'2rem'} maxWidth={'7xl'}>
      <SellerSection />
      <FoodHomeContainer />
    </Container>
  );
};

export default MainContainer;
