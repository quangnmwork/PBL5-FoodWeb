import { FormControl, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { createRef } from 'react';
import ButtonCustom from '../../../components/Button/ButtonCustom';
import FormInput from '../../../components/Form/FormInput';
import FormSelect from '../../../components/Form/FormSelect';
import FormFooterSwitch from './FormFooterSwitch';
import FormHeading from './FormHeading';

const FormSignUp = () => {
  const emailInput = createRef<HTMLInputElement>();
  const userNameInput = createRef<HTMLInputElement>();
  const passwordInput = createRef<HTMLInputElement>();
  const passwordConfirmInput = createRef<HTMLInputElement>();
  const addressInput = createRef<HTMLInputElement>();
  const phoneInput = createRef<HTMLInputElement>();
  const roleInput = createRef<HTMLSelectElement>();
  return (
    <FormControl
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: '1' }}
    >
      <FormHeading />
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
      <FormSelect ref={roleInput} />
      <ButtonCustom
        textDisplay="Sign up"
        onClick={() => {
          console.log();
        }}
        width={'100%'}
      />
      <FormFooterSwitch
        message={'Đã có tài khoản?'}
        messageActionType={'sign-up'}
      />
    </FormControl>
  );
};

export default FormSignUp;
