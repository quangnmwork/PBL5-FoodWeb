import { Flex } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/authentication/useUser';
import { useSearch } from '../../services/utils/useSearch';

import AvatarCustom from '../Avatar/AvatarCustom';
import ButtonCustom from '../Button/ButtonCustom';
import Logo from '../Logo/Logo';
import Cart from './Cart/Cart';
import SearchBar from './SearchBar/SearchBar';
interface NavigattionProps {
  isMustHide?: boolean;
}
const Navigation = ({ isMustHide }: NavigattionProps) => {
  const { data, error } = useUser(0);

  const navigate = useNavigate();
  const handlerLoginRouter = () => {
    navigate('/auth/sign-in');
  };

  const search = useSearch();
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
      <Logo
        width={['3rem', '4rem']}
        height={['3rem', '4rem']}
        state={{ searchInput: search.searchInput, category: search.category }}
      />
      {error || !data || !isMustHide ? <SearchBar /> : null}

      {error || !data ? (
        <ButtonCustom textDisplay={'Đăng nhập'} onClick={handlerLoginRouter} />
      ) : (
        <Flex alignItems={'center'}>
          {data && data.nameGroup == 'Customer' ? <Cart /> : null}
          <AvatarCustom py={'2'} transition={'all .3s'} userData={data} />
        </Flex>
      )}
    </Flex>
  );
};
export default Navigation;
