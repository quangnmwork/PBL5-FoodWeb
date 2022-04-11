import { FormControl } from '@chakra-ui/react';
import React, { createRef } from 'react';

import FormInput from '../../../components/Form/FormInput';

const FormSignIn = () => {
  const emailInput = createRef<HTMLInputElement>();
  const passwordInput = createRef<HTMLInputElement>();
  const loginHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(emailInput.current?.value);
    console.log(passwordInput.current?.value);
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
