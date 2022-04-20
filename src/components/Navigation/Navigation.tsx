import { Flex } from '@chakra-ui/react';
import { useUser } from '../../hooks/authentication/useUser';
import AvatarCustom from '../Avatar/AvatarCustom';
import ButtonCustom from '../Button/ButtonCustom';
import Logo from '../Logo/Logo';
import SearchBar from './SearchBar/SearchBar';

const Navigation = () => {
  const { data, error } = useUser();
  console.log(error);
  return (
    <Flex alignItems={'center'}>
      <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
      <SearchBar />
      <AvatarCustom py={'2'} transition={'all .3s'} userData={data} />
      <ButtonCustom
        textDisplay={'Đăng nhập'}
        onClick={() => {
          console.log();
        }}
      />
    </Flex>
  );
};
export default Navigation;
