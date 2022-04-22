import { Container } from '@chakra-ui/react';
import SellerSection from '../../../components/SellerSection/SellerSection';

const MainContainer = () => {
  return (
    <Container mt={'2rem'} maxW={'6xl'}>
      <SellerSection />
    </Container>
  );
};

export default MainContainer;
