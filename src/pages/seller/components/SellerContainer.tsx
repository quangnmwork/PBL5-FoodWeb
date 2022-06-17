import { Box } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Loading from '../../../components/layout/Loading';
import { useUser } from '../../../hooks/authentication/useUser';
const Navigation = lazy(
  () => import('../../../components/Navigation/Navigation')
);
const SellerMain = lazy(() => import('../../../components/Seller/SellerMain'));
import useWatchScroll from '../../../hooks/utils/useWatchScroll';

const SellerContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  const { data, error } = useUser(0);
  if (!data && !error) return <Loading />;

  return (
    <Box bgColor={'bgMain.100'} position="relative" minH={'100%'}>
      <Suspense fallback={<Loading />}>
        <Navigation
          isMustHide={data && data.nameGroup !== 'Customer' ? true : false}
        />
        <SellerMain />
      </Suspense>
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default SellerContainer;
