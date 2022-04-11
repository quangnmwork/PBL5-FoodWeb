import { FormControl } from '@chakra-ui/react';
import React, { createRef } from 'react';
import { authAPI } from '../../../api/repositoryFactory';

import FormInput from '../../../components/Form/FormInput';

const FormSignIn = () => {
  const emailInput = createRef<HTMLInputElement>();
  const passwordInput = createRef<HTMLInputElement>();
  const loginHandler = async (e: React.SyntheticEvent<HTMLInputElement>) => {
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
    <FormControl>
      <FormInput ref={emailInput} textLabel={'Email'} />
      <FormInput
        ref={passwordInput}
        textLabel={'Password'}
        typeInput={'password'}
      />
      <FormInput textLabel="Submit" typeInput="submit" onClick={loginHandler} />
    </FormControl>
  );
};

export default FormSignIn;
