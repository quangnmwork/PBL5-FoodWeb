import { Flex } from '@chakra-ui/react';
import { useUser } from '../../hooks/authentication/useUser';
import AvatarCustom from '../Avatar/AvatarCustom';
import ButtonCustom from '../Button/ButtonCustom';
import Logo from '../Logo/Logo';
import Cart from './Cart/Cart';
import SearchBar from './SearchBar/SearchBar';

const Navigation = () => {
  const { data, error } = useUser();
  console.log(error);
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      p={'.5rem 2rem'}
      borderBottomWidth={'1px'}
      borderBottomStyle={'solid'}
      borderBottomColor={'main.100'}
    >
      <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
      <SearchBar />

      {!data ? (
        <ButtonCustom textDisplay={'Đăng nhập'} />
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
