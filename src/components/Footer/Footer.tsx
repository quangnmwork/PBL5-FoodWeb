import React from 'react';

import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import Logo from '../Logo/Logo'

export const Footer = () => (
  <Flex
  display="flex"
  flex-wrap="wrap"
  flex-direction="column"
  >
    <Flex width="100%" backgroundColor="green.100" display="flex" flex-direction="column" alignItems="start" justifyContent="center">
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      // justify="space-between"
      py={{ base: '12', md: '16' }}
      // align="start"
      justifyContent="center"
    >
      <Stack spacing={{ base: '6', md: '18' }}>
        <IconButton as="a" href="#" aria-label="Home" size="5 rem" backgroundColor="white" icon={<Logo width={['5rem', '6rem']} height={['5rem', '6rem']}></Logo>} />
        <Text color="muted" width="100px">Fast and safe delivery</Text>
      </Stack>
      <Stack
        direction={{ base: 'row-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="subtle">
            Stay up to date
          </Text>
          <Stack spacing="4" direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
            <Input borderColor="black" placeholder="Enter your email" type="email" required width="500px" />
            <Button variant="primary" type="submit" flexShrink={0} backgroundColor="green.300">
            Subcribe
            </Button>
            
          </Stack>
          <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Fooder TP Đà Nẵng
      </Text>
        </Stack>
      </Stack>
    </Stack>
    </Flex>
  </Flex>
)

export default Footer;
