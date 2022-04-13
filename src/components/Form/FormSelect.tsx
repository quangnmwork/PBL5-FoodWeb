import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
const nameGroupList = ['Customer', 'Seller', 'Shipper'];
const FormSelect = React.forwardRef<HTMLSelectElement>((_, ref) => {
  return (
    <FormControl mb={'1rem'}>
      <FormLabel>Type Account</FormLabel>
      <Select ref={ref}>
        {nameGroupList.map((nameGroup: string) => (
          <option value={nameGroup} key={nameGroup}>
            {nameGroup}
          </option>
        ))}
      </Select>
    </FormControl>
  );
});
FormSelect.displayName = 'FormSelect';

export default FormSelect;
