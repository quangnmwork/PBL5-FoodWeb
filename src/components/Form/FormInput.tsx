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
}

const FormInput = React.forwardRef<HTMLInputElement, UserSignup>(
  (props, ref) => {
    const { ...rest } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const handleType = useCallback(() => {
      if (props.typeInput == 'password' && showPassword == true) return 'text';
      if (!props.typeInput) return 'text';
      return props.typeInput;
    }, [showPassword]);
    const handleDisable = useCallback(() => {
      if (props.mustDisable) return true;
      if (props.isEditable && !canEdit) return true;
      return false;
    }, [canEdit]);
    return (
      <FormControl
        my={{ base: '.5rem', md: '1rem' }}
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
            isReadOnly={handleDisable()}
            placeholder={props.placeholder}
            {...(props.register && props.nameRegister
              ? props.register(props.nameRegister)
              : null)}
            {...rest}
            variant={handleDisable() ? 'filled' : 'outline'}
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
          {props.isEditable ? (
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
        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
