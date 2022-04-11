import Logo from '../../../components/Logo/Logo';
import { Heading, HStack } from '@chakra-ui/react';
const FormHeading = () => {
  return (
    <HStack justifyContent={'center'} width={'90%'}>
      <Logo width={['5rem', '6rem']} height={['5rem', '6rem']} />
      <Heading fontSize={{ base: 'lg', md: '2xl' }}>Welcome Back</Heading>
    </HStack>
  );
};

export default FormHeading;
