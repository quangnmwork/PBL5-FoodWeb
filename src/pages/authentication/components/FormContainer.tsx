import { useLocation } from 'react-router-dom';
import FormSignUp from './FormSignUp';
import FormSignIn from './FormSignIn';
import { Flex, Box } from '@chakra-ui/react';

const FormContainer = () => {
  const currentPath = useLocation();
  return (
    <Box height={'100%'}>
      <Flex
        bgImage={'/assets/bg-form.png'}
        bgRepeat={'no-repeat'}
        bgPosition={'center'}
        width={'100%'}
        minHeight={'100%'}
        bgSize={'cover'}
        justifyContent={'center'}
        alignItems={'center'}
        py={'3rem'}
      >
        {currentPath.pathname == '/auth/sign-in' ? (
          <FormSignIn />
        ) : (
          <FormSignUp />
        )}
      </Flex>
    </Box>
  );
};

export default FormContainer;
