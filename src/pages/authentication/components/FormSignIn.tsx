import { FormControl } from '@chakra-ui/react';
import React, { createRef } from 'react';
import { authAPI } from '../../../api/repositoryFactory';
import { motion } from 'framer-motion';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import FormInput from '../../../components/Form/FormInput';
import FormFooterSwitch from './FormFooterSwitch';
import FormHeading from './FormHeading';

const FormSignIn = () => {
  const emailInput = createRef<HTMLInputElement>();
  const passwordInput = createRef<HTMLInputElement>();
  const loginHandler = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(emailInput.current?.value);
    console.log(passwordInput.current?.value);
    if (emailInput.current?.value && passwordInput.current?.value) {
      const res = await authAPI.signin({
        email: emailInput.current?.value,
        password: passwordInput.current?.value
      });
      console.log(await res);
    }
  };
  return (
    <FormControl
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: '1' }}
    >
      <FormHeading />
      <FormInput ref={emailInput} textLabel={'Email'} />
      <FormInput
        ref={passwordInput}
        textLabel={'Password'}
        typeInput={'password'}
      />
      <ButtonCustom
        textDisplay={'Sign In'}
        onClick={loginHandler}
        width={'100%'}
      />
      <FormFooterSwitch
        message={'Chưa có tài khoản?'}
        messageActionType={'sign-in'}
      />
    </FormControl>
  );
};

export default FormSignIn;
