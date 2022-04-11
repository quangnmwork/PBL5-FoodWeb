import { FormControl, Heading, HStack, Text } from '@chakra-ui/react';
import { createRef } from 'react';
import ButtonCustom from '../../../components/Button/ButtonCustom';

import FormInput from '../../../components/Form/FormInput';
import FormSelect from '../../../components/Form/FormSelect';
import Logo from '../../../components/Logo/Logo';
const FormSignUp = () => {
  const emailInput = createRef<HTMLInputElement>();
  const userNameInput = createRef<HTMLInputElement>();
  const passwordInput = createRef<HTMLInputElement>();
  const passwordConfirmInput = createRef<HTMLInputElement>();
  const addressInput = createRef<HTMLInputElement>();
  const phoneInput = createRef<HTMLInputElement>();
  return (
    <FormControl>
      <HStack>
        <Logo width={['5rem', '6rem']} height={['5rem', '6rem']} />
        <Heading fontSize={{ base: 'md', md: '2xl' }} flexBasis={'80%'}>
          Welcome Back
        </Heading>
      </HStack>
      <HStack gap={'.5rem'}>
        <FormInput ref={emailInput} textLabel={'Email'} />
        <FormInput ref={userNameInput} textLabel={'Username'} />
      </HStack>
      <HStack gap={'.5rem'}>
        <FormInput ref={addressInput} textLabel={'Address'} />
        <FormInput ref={phoneInput} textLabel={'Phone'} />
      </HStack>
      <FormInput
        ref={passwordInput}
        textLabel={'Password'}
        typeInput={'password'}
      />
      <FormInput
        ref={passwordConfirmInput}
        textLabel={'Password Confirm'}
        typeInput={'password'}
      />
      <FormSelect />
      <ButtonCustom
        textDisplay="Sign In"
        onClick={() => {
          console.log();
        }}
        width={'100%'}
      />
      <Text
        fontSize={{ base: 'xs', md: 'md' }}
        textAlign={'center'}
        mt={'1rem'}
      >
        Đã có tài khoản?
        <Text
          sx={{
            display: 'inline',
            ml: '.2rem',
            cursor: 'pointer',
            color: 'main.600'
          }}
        >
          Đăng nhập
        </Text>
      </Text>
    </FormControl>
  );
};

export default FormSignUp;
