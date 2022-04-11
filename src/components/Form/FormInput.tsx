import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface UserInput {
  textLabel: string;
  typeInput?: string;
  onClick?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
const FormInput = React.forwardRef<HTMLInputElement, UserInput>(
  (props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.textLabel}>{props.textLabel}</FormLabel>
        <Input
          ref={ref}
          id={props.textLabel}
          type={props.typeInput || 'text'}
          onClick={props.typeInput == 'submit' ? props.onClick : undefined}
        />
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
