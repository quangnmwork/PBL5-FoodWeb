import { useLocation } from 'react-router-dom';
import FormSignUp from './FormSignUp';
import FormSignIn from './FormSignIn';
import { Flex } from '@chakra-ui/react';

const FormContainer = () => {
  const currentPath = useLocation();
  return (
    <Flex
      bgImage={'/assets/bg-form.png'}
      bgRepeat={'no-repeat'}
      width={'100%'}
      // height={'100%'}
      bgSize={'100vw 100%'}
      justifyContent={'center'}
      alignItems={'center'}
      py={'3rem'}
    >
      <Flex
        direction={'column'}
        bgColor={'white'}
        padding={'2rem'}
        borderRadius={'.5rem'}
        width={{ base: '80%', md: '50%', lg: '30%' }}
      >
        {currentPath.pathname == '/auth/sign-in' ? (
          <FormSignIn />
        ) : (
          <FormSignUp />
        )}
      </Flex>
    </Flex>
  );
};

export default FormContainer;
