import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface UserInput {
  textLabel: string;
  typeInput?: string;
}
const FormInput = React.forwardRef<HTMLInputElement, UserInput>(
  (props, ref) => {
    return (
      <FormControl my={{ base: '.5rem', md: '.8rem' }}>
        {props.typeInput !== 'submit' ? (
          <FormLabel htmlFor={props.textLabel}>{props.textLabel}</FormLabel>
        ) : null}
        <Input
          borderWidth={'1.5px'}
          ref={ref}
          id={props.textLabel}
          type={props.typeInput || 'text'}
        />
      </FormControl>
    );
  }
);
FormInput.displayName = 'FormInput';

export default FormInput;
