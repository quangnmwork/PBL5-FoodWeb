import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleType = useCallback(() => {
      if (props.typeInput == 'password' && showPassword == true) return 'text';
      if (!props.typeInput) return 'text';
      return props.typeInput;
    }, [showPassword]);
    return (
      <FormControl
        my={{ base: '.5rem', md: '1.2rem' }}
        isInvalid={props.errorMessage ? true : false}
      >
        {props.typeInput !== 'submit' ? (
          <FormLabel htmlFor={props.textLabel}>{props.textLabel}</FormLabel>
        ) : null}
        <InputGroup>
          <Input
            borderWidth={'1.5px'}
            ref={ref}
            id={props.textLabel}
            type={handleType()}
            placeholder={props.placeholder}
            {...(props.register && props.nameRegister
              ? props.register(props.nameRegister)
              : null)}
          />
          {props.typeInput == 'password' ? (
            <InputRightElement height={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          ) : null}
        </InputGroup>
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
