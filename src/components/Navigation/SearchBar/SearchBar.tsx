import { Box, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import NestedMenu from './NestedMenu';

const SearchBar = () => {
  return (
    <Flex>
      <NestedMenu />
      <Box>
        <Input type={'text'}></Input>
      </Box>
    </Flex>
  );
};

export default SearchBar;
