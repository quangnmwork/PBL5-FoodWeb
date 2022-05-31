import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { signinInput, signupInput } from '../../models/Authentication.model';
const nameGroupList = ['Customer', 'Seller', 'Shipper'];

interface FormSelectProps extends SelectProps {
  register?: UseFormRegister<signupInput | signinInput>;
  nameRegister?: 'nameGroup';
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <FormControl my={'1rem'}>
        <FormLabel>Loại tài khoản</FormLabel>
        <Select
          ref={ref}
          {...(props.register && props.nameRegister
            ? props.register(props.nameRegister)
            : null)}
          {...rest}
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
