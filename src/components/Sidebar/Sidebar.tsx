import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DynamicObject } from '../../models/DynamicObject.model';
import MobileSidebar from './MobileSidebar';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  children?: ReactNode;
  userData: DynamicObject;
  error: DynamicObject;
}

const Sidebar = (props: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(props.userData);
  return (
    <Box minHeight={'100%'}>
      <SidebarContent
        onClose={onClose}
        userData={props.userData}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} userData={props.userData} />
        </DrawerContent>
      </Drawer>
      <MobileSidebar onOpen={onOpen} userData={props.userData} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {props.children}
      </Box>
    </Box>
  );
};

export default Sidebar;
