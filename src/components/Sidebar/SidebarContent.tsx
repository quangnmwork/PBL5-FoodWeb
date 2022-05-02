import { Box, Flex, Text, CloseButton, BoxProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { DynamicObject } from '../../models/DynamicObject.model';
import { getSideBarContent } from '../../utils/SidebarContent';

import SidebarItem from './SidebarItem';

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  userData: DynamicObject;
}
const SidebarContent = ({
  onClose,
  userData,
  ...rest
}: SidebarContentProps) => {
  const SidebarItems = userData ? getSideBarContent(userData.nameGroup) : [];

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
      {SidebarItems
        ? SidebarItems.map((sidebar) => (
            <SidebarItem
              linkTo={sidebar.linkTo}
              isActive={true}
              icon={sidebar.icon}
              iconText={sidebar.iconText}
              key={sidebar.iconText}
            />
          ))
        : null}
    </Box>
  );
};

export default SidebarContent;
