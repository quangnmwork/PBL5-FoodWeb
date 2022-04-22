import { Flex, Select } from '@chakra-ui/react';
import { categories } from '../../../utils/constants';

import './NestedMenu.css';
const NestedMenu = () => {
  return (
    <Flex flexBasis={'20%'}>
      <Select
        defaultValue={'Quán ăn'}
        focusBorderColor={'main.100'}
        variant={'filled'}
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
};

export default NestedMenu;
