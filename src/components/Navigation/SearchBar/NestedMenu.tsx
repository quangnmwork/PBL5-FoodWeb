import { Flex, Select } from '@chakra-ui/react';

import './NestedMenu.css';
const categories = [
  {
    idCategory: 1,
    nameCategory: 'Đồ ăn'
  },
  {
    idCategory: 2,
    nameCategory: 'Đồ uống'
  },
  {
    idCategory: 3,
    nameCategory: 'Đồ chay'
  },
  {
    idCategory: 4,
    nameCategory: 'Bánh kem'
  },
  {
    idCategory: 5,
    nameCategory: 'Tráng miệng'
  }
];
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
