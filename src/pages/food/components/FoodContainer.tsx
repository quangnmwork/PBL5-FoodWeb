import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import FoodMain from '../../../components/Food/FoodMain';
import Navigation from '../../../components/Navigation/Navigation';
import { useUser } from '../../../hooks/authentication/useUser';
import clientStorage from '../../../utils/clientStorage';

const FoodContainer = () => {
  const { data, error } = useUser(0);
  // console.log('Error', !error);
  if (!error) {
    if (
      data?.nameGroup !== 'Customer' &&
      data &&
      clientStorage.getClientStorage().getToken()
    )
      return <Navigate to={'/user/profile'} replace={true} />;
  }
  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Navigation />
      <FoodMain />
    </Box>
  );
};

export default FoodContainer;
