import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';
import { useUser } from '../../hooks/authentication/useUser';
import ButtonCustom from '../Button/ButtonCustom';
import Logo from '../Logo/Logo';
import SearchBar from './SearchBar/SearchBar';

const Navigation = () => {
  const { data, error } = useUser();
  return (
    <Flex>
      <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
      <SearchBar />
      <Avatar
        src={
          data.avatar ||
          'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'
        }
        display={error ? 'none' : 'block'}
      />
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
