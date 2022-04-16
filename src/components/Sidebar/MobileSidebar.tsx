import {
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
interface MobileSidebarProps {
  onOpen: () => void;
}

const MobileSidebar = (props: MobileSidebarProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={props.onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HiOutlineMenuAlt2 />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        fontWeight="bold"
        color={'main.100'}
      >
        User Dashboard
      </Text>
      <Menu>
        <MenuButton py={2} transition="all 0.3s">
          <Avatar
            src={'https://bcons.com.vn/wp-content/uploads/2019/11/avatar.jpg'}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Thông tin cá nhân</MenuItem>
          <MenuItem>Đăng xuất</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MobileSidebar;
