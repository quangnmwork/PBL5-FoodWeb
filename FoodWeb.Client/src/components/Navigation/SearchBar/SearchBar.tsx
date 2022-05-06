import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { createRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NestedMenu from './NestedMenu';

const SearchBar = () => {
  const searchRef = createRef<HTMLInputElement>();
  const menuOptionRef = createRef<HTMLSelectElement>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const handleSearchString =
      menuOptionRef.current?.value != 'Quán ăn'
        ? `nameCategory=${menuOptionRef.current?.value}&`
        : '';
    const handleSearchKeyName = searchRef.current?.value || '';
    window.scrollTo({ top: 0 });
    navigate(
      `../${
        !location.pathname.includes('search') ? 'search/' : ''
      }?${handleSearchString}keyName=${handleSearchKeyName}`,
      {
        replace: true
      }
    );
  };
  const handleKeyDownSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex flexBasis={'45%'}>
      <NestedMenu ref={menuOptionRef} />
      <Box flexBasis={'80%'}>
        <InputGroup>
          <Input
            type={'text'}
            width={'100%'}
            ref={searchRef}
            onKeyDown={handleKeyDownSearch}
          ></Input>
          <InputRightElement
            onClick={() => {
              handleSearch();
            }}
          >
            <Icon as={Search2Icon} />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default SearchBar;
