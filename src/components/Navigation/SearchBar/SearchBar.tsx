import { Box, Flex, Input, Select } from '@chakra-ui/react';
import React from 'react';

const SearchBar = () => {
  return (
    <Flex>
      <Box>
        <Select>
          <option>Đồ ăn</option>
          <option>Quán ăn</option>
        </Select>
      </Box>
      <Box>
        <Input type={'text'}></Input>
      </Box>
    </Flex>
  );
};

export default SearchBar;
