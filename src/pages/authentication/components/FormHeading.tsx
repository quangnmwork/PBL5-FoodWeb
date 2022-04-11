import Logo from '../../../components/Logo/Logo';
import { Heading, HStack } from '@chakra-ui/react';
const FormHeading = () => {
  return (
    <HStack>
      <Logo width={['5rem', '6rem']} height={['5rem', '6rem']} />
      <Heading fontSize={{ base: 'md', md: '2xl' }} flexBasis={'80%'}>
        Welcome Back
      </Heading>
    </HStack>
  );
};

export default FormHeading;
