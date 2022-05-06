import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/authentication/useUser';
import { checkObjectExist } from '../../utils/checkObjectNull';

import AvatarCustom from '../Avatar/AvatarCustom';
import ButtonCustom from '../Button/ButtonCustom';
import Logo from '../Logo/Logo';
import Cart from './Cart/Cart';
import SearchBar from './SearchBar/SearchBar';

const Navigation = () => {
  const { data, error } = useUser();
  const navigate = useNavigate();
  const handlerLoginRouter = () => {
    navigate('/auth/sign-in', { replace: true });
  };
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      p={'.5rem 2rem'}
      borderBottomWidth={'1px'}
      borderBottomStyle={'solid'}
      borderBottomColor={'main.100'}
      bgColor={'white'}
      position={'sticky'}
      top={'0'}
      zIndex={'2'}
    >
      <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
      <SearchBar />

      {error || !checkObjectExist(data) ? (
        <ButtonCustom textDisplay={'Đăng nhập'} onClick={handlerLoginRouter} />
      ) : (
        <Flex alignItems={'center'}>
          <Cart />
          <AvatarCustom py={'2'} transition={'all .3s'} userData={data} />
        </Flex>
      )}
    </Flex>
  );
};
export default Navigation;
