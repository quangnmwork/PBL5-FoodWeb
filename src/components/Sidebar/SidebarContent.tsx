import { Box, Flex, Text, CloseButton, useDisclosure } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSecurityScan
} from 'react-icons/ai';

import SidebarItem from './SidebarItem';

const SidebarItems = [
  { icon: AiOutlineHome, iconText: 'Trang chủ' },
  { icon: AiOutlineUser, iconText: 'Thông tin cá nhân' },
  {
    icon: AiOutlineSecurityScan,
    iconText: 'Bảo mật'
  }
];
interface SidebarContentProps {
  onClose: () => void;
}
const SidebarContent = (props: SidebarContentProps) => {
  return (
    <Box
      transition="1s ease-in"
      borderRight="1px"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      display={{ base: 'none', md: 'block' }}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color={'main.100'}>
          User Dashboard
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={props.onClose}
        />
      </Flex>
      {SidebarItems.map((sidebar) => (
        <SidebarItem
          icon={sidebar.icon}
          iconText={sidebar.iconText}
          key={sidebar.iconText}
        />
      ))}
    </Box>
  );
};

export default SidebarContent;
