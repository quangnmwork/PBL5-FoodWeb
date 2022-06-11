import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Footer from '../../../components/Footer/Footer';
import Hero from '../../../components/Hero/Hero';
import Loading from '../../../components/layout/Loading';
import { useUser } from '../../../hooks/authentication/useUser';
import useWatchScroll from '../../../hooks/utils/useWatchScroll';
import clientStorage from '../../../utils/clientStorage';
import { MAX_TIME } from '../../../utils/constants';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  const { data, error } = useUser(MAX_TIME);

  if (!data && clientStorage.getClientStorage().getToken()) {
    return <Loading />;
  }
  if (!error) {
    if (data) {
      if (
        data?.nameGroup !== 'Customer' &&
        clientStorage.getClientStorage().getToken()
      )
        return <Navigate to={'/user/profile'} replace={true} />;
    }
  }

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
