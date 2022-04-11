import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
const nameGroupList = ['customer', 'seller', 'shipper'];
const FormSelect = React.forwardRef(() => {
  return (
    <FormControl mb={'1rem'}>
      <FormLabel>Role</FormLabel>
      <Select>
        {nameGroupList.map((nameGroup: string) => (
          <option value={nameGroup} key={nameGroup}>
            nameGroup
          </option>
        ))}
      </Select>
    </FormControl>
  );
});
FormSelect.displayName = 'FormSelect';

export default FormSelect;
