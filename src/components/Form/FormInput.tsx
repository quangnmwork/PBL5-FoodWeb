import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  InputProps,
  Icon
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { UseFormRegister } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';

interface UserSignup extends InputProps {
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
  isEditable?: boolean;
  mustDisable?: boolean;
  my?: any;
}

const FormInput = React.forwardRef<HTMLInputElement, UserSignup>(
  (props, ref) => {
    const {
      typeInput,
      textLabel,
      placeholder,
      errorMessage,
      isEditable,
      mustDisable,
      my,
      register,
      nameRegister,
      ...rest
    } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const handleType = useCallback(() => {
      if (typeInput == 'password' && showPassword == true) return 'text';
      if (!typeInput) return 'text';
      return typeInput || 'text';
    }, [showPassword]);
    const handleDisable = useCallback(() => {
      if (mustDisable) return true;
      if (isEditable && !canEdit) return true;
      return false;
    }, [canEdit]);
    return (
      <FormControl
        my={my || { base: '.5rem', md: '1rem' }}
        isInvalid={errorMessage ? true : false}
      >
        {typeInput !== 'submit' ? (
          <FormLabel htmlFor={textLabel}>{textLabel}</FormLabel>
        ) : null}
        <InputGroup>
          <Input
            borderWidth={'1.5px'}
            ref={ref}
            id={typeInput !== 'submit' ? textLabel : ''}
            type={handleType()}
            isReadOnly={handleDisable()}
            placeholder={placeholder || ''}
            {...(register && nameRegister ? register(nameRegister) : null)}
            {...rest}
            variant={handleDisable() ? 'filled' : 'outline'}
          />
          {typeInput == 'password' ? (
            <InputRightElement height={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          ) : null}
          {isEditable ? (
            <InputRightElement height={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => {
                  setCanEdit((canEdit) => !canEdit);
                }}
              >
                <Icon as={FiEdit2} title={'Chỉnh sửa thông tin'} />
              </Button>
            </InputRightElement>
          ) : null}
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
