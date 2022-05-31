import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps extends FlexProps {
  icon: IconType;
  iconText: string;
  isActive?: boolean;
  linkTo: string;
}

const SidebarItem = (props: SidebarItemProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      alignItems={'center'}
      padding={'4'}
      mx={'3'}
      role="group"
      cursor={'pointer'}
      borderRadius={'lg'}
      bgColor={'white'}
      transition={'all .2s'}
      my={'1rem'}
      color={props.isActive ? 'white' : ''}
      backgroundColor={props.isActive ? 'main.200' : 'transparent'}
      _hover={{ backgroundColor: 'main.200', color: 'white' }}
      onClick={() => {
        navigate(props.linkTo);
      }}
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
      <Text fontWeight={'bold'}> {props.iconText}</Text>
    </Flex>
  );
};

export default SidebarItem;
