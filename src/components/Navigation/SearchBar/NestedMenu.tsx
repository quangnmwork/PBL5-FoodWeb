import { Flex, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSearch } from '../../../services/utils/useSearch';
import { categories } from '../../../utils/constants';

import './NestedMenu.css';
interface NestedMenuProps {
  defaultValue?: string;
}
const NestedMenu = React.forwardRef<HTMLSelectElement, NestedMenuProps>(
  (props, ref) => {
    const [option, setOption] = useState<string>();
    const search = useSearch();

    return (
      <Flex flexBasis={'20%'}>
        <Select
          defaultValue={props.defaultValue || 'Quán ăn'}
          focusBorderColor={'main.100'}
          variant={'filled'}
          ref={ref}
          value={option}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setOption(e.target.value);
            search.setSearchInput(option || 'Quán ăn');
          }}
        >
          <optgroup label="Địa điểm">
            <option value={'Quán ăn'} className="option">
              Quán ăn
            </option>
          </optgroup>
          <optgroup label="Thực phẩm">
            {categories.map((category) => (
              <option
                key={category.idCategory}
                value={category.nameCategory}
                className="option"
              >
                {category.nameCategory}
              </option>
            ))}
          </optgroup>
        </Select>
      </Flex>
    );
  }
);
NestedMenu.displayName = 'NestedMenu';

export default NestedMenu;
