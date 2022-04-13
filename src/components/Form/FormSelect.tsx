import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';
const nameGroupList = ['Customer', 'Seller', 'Shipper'];

interface SelectProps {
  register?: UseFormRegister<signupInput | signinInput>;
  nameRegister?: 'nameGroup';
}

const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <FormControl mb={'1rem'}>
        <FormLabel>Type Account</FormLabel>
        <Select
          ref={ref}
          {...(props.register && props.nameRegister
            ? props.register(props.nameRegister)
            : null)}
        >
          {nameGroupList.map((nameGroup: string) => (
            <option value={nameGroup} key={nameGroup}>
              {nameGroup}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }
);
FormSelect.displayName = 'FormSelect';

export default FormSelect;
