import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import MobileSidebar from './MobileSidebar';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minHeight={'100%'}>
      <SidebarContent
        onClose={onClose}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileSidebar onOpen={onOpen} />
    </Box>
  );
};

export default Sidebar;
