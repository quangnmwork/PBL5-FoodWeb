import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React from 'react';
import NestedMenu from './NestedMenu';

const SearchBar = () => {
  return (
    <Flex flexBasis={'45%'}>
      <NestedMenu />
      <Box flexBasis={'80%'}>
        <InputGroup>
          <Input type={'text'} width={'100%'}></Input>
          <InputRightElement>
            <Icon as={Search2Icon} />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default SearchBar;
