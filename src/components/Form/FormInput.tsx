import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';

interface UserInput<T> {
  textLabel: string;
  placeholder?: string;
  typeInput?: string;
  errorMessage?: string;
  register?: UseFormRegister<T>;
  nameRegister?:
    | 'email'
    | 'password'
    | 'nameUser'
    | 'phone'
    | 'address'
    | 'nameGroup';
}
const FormInput = React.forwardRef<
  HTMLInputElement,
  UserInput<signinInput | signupInput>
>((props, ref) => {
  return (
    <FormControl
      my={{ base: '.5rem', md: '.8rem' }}
      isInvalid={props.errorMessage ? true : false}
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
});
FormInput.displayName = 'FormInput';

export default FormInput;
