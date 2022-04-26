import { Flex, IconButton, Text } from '@chakra-ui/react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { DynamicObject } from '../../models/DynamicObject.model';
import AvatarCustom from '../Avatar/AvatarCustom';
interface MobileSidebarProps {
  onOpen: () => void;
  userData?: DynamicObject;
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
      <Link to={'/'} replace={true}>
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="xl"
          fontWeight="bold"
          color={'main.100'}
          cursor={'pointer'}
        >
          User Dashboard
        </Text>
      </Link>
      <AvatarCustom userData={props.userData} />
    </Flex>
  );
};

export default MobileSidebar;
