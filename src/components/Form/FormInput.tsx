import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';

interface UserSignup {
  textLabel: string;
  placeholder?: string;
  typeInput?: string;
  errorMessage?: string;
  register?: UseFormRegister<signinInput | signupInput>;
  nameRegister?:
    | 'email'
    | 'password'
    | 'passwordConfirm'
    | 'nameUser'
    | 'phone'
    | 'address'
    | 'nameGroup';
}

const FormInput = React.forwardRef<HTMLInputElement, UserSignup>(
  (props, ref) => {
    return (
      <FormControl
        my={{ base: '.5rem', md: '1.2rem' }}
        isInvalid={props.errorMessage ? true : false}
        // position={'relative'}
      >
        {props.typeInput !== 'submit' ? (
          <FormLabel htmlFor={props.textLabel}>{props.textLabel}</FormLabel>
        ) : null}
        <Input
          borderWidth={'1.5px'}
          ref={ref}
          id={props.textLabel}
          type={props.typeInput || 'text'}
          placeholder={props.placeholder}
          {...(props.register && props.nameRegister
            ? props.register(props.nameRegister)
            : null)}
        />
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
