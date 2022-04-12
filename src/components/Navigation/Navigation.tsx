import React from 'react';
import Logo from '../Logo/Logo';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';



const Links = ['Đồ ăn', 'Đồ uống'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'underline',
      bg: useColorModeValue('gray.200', 'green.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Logo width={['2rem', '3rem']} height={['2rem', '3rem']} />
              </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Buy
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}>
              Đăng nhập
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={5}
                mr={4}
                
                >
                  
                {/* <Avatar
                  size={'sm'}
                  src={
                    'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/system-users-icon.png'
                    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLIZg8z_O9eQ-cHeAc6o0Mz3k8ZTBOJACQoQ&usqp=CAU'
                  }
                  
                /> */}
                <IconButton aria-label='Add to friends' colorScheme={'teal'} size={'sm'} icon={<HamburgerIcon />} />
              </MenuButton>
              <MenuList>
                <MenuItem>Xem bài</MenuItem>
                <MenuItem>Đăng bài</MenuItem>
                <MenuDivider />
                <MenuItem>Thông tin liên hệ</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>

    </>
  );
}

// export default Navigation;
