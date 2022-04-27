import { Box, Flex, Text, CloseButton, BoxProps } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineShoppingCart
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import SidebarItem from './SidebarItem';

const SidebarItems = [
  { icon: AiOutlineHome, iconText: 'Trang chủ', linkTo: '/' },
  {
    icon: AiOutlineUser,
    iconText: 'Thông tin cá nhân',
    linkTo: '/user/profile'
  },
  {
    icon: AiOutlineSetting,
    iconText: 'Bảo mật',
    linkTo: '/user/security'
  },
  {
    icon: AiOutlineShoppingCart,
    iconText: 'Quản lý đơn hàng',
    linkTo: '/user/history-order'
  }
];
interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box
      transition="1s ease-in"
      borderRightWidth={'1px'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      bgColor={'white'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to={'/'} replace={true}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={'main.100'}
            cursor={'pointer'}
          >
            User Dashboard
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {SidebarItems.map((sidebar) => (
        <SidebarItem
          linkTo={sidebar.linkTo}
          isActive={true}
          icon={sidebar.icon}
          iconText={sidebar.iconText}
          key={sidebar.iconText}
        />
      ))}
    </Box>
  );
};

export default SidebarContent;
