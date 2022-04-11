import { useLocation } from 'react-router-dom';
import FormSignUp from './FormSignUp';
import FormSignIn from './FormSignIn';
import { Flex } from '@chakra-ui/react';
import './container.css';
const FormContainer = () => {
  const currentPath = useLocation();
  return (
    <Flex
      bgImage={'/assets/bg-form.png'}
      bgRepeat={'no-repeat'}
      width={'100%'}
      height={'100vh'}
      bgSize={'100vw 100vh'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <Flex direction={'column'} bgColor={'white'}>
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
