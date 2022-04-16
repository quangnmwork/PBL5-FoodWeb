import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface SidebarItemProps extends FlexProps {
  icon: IconType;
  iconText: string;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <Flex
      alignItems={'center'}
      p="4"
      mx="0"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'main.100',
        color: 'white'
      }}
      transition={'all .2s'}
    >
      {props.icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white'
          }}
          as={props.icon}
        />
      )}
      {props.iconText}
    </Flex>
  );
};

export default SidebarItem;
