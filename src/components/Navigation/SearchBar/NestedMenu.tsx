import { Select } from '@chakra-ui/react';

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
    <div className="container">
      <Select defaultValue={'Quán ăn'} focusBorderColor={'main.100'}>
        <optgroup label="Địa điểm">
          <option value={'Quán ăn'}>Quán ăn</option>
        </optgroup>
        <optgroup label="Thực phẩm">
          {categories.map((category) => (
            <option key={category.idCategory} value={category.nameCategory}>
              {category.nameCategory}
            </option>
          ))}
        </optgroup>
      </Select>
    </div>
  );
};

export default NestedMenu;
