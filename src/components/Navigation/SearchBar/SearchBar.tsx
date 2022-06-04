import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { createRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../../services/utils/useSearch';
import NestedMenu from './NestedMenu';

const SearchBar = () => {
  const searchRef = createRef<HTMLInputElement>();
  const menuOptionRef = createRef<HTMLSelectElement>();
  const state = useLocation().state as {
    searchInput: string;
    category: string;
  };
  const search = useSearch();
  const [searchInput, setSearchInput] = useState<string>(
    state && state.searchInput ? state.searchInput : ''
  );

  const navigate = useNavigate();

  const handleSearch = () => {
    const handleSearchString =
      menuOptionRef.current?.value != 'Quán ăn'
        ? `nameCategory=${menuOptionRef.current?.value}&`
        : '';
    const handleSearchKeyName = searchInput;
    window.scrollTo({ top: 0 });
    search.setSearchInput(searchInput);
    search.setCategory(menuOptionRef.current?.value || 'Quán ăn');
    navigate(`../search?${handleSearchString}keyName=${handleSearchKeyName}`, {
      state: {
        searchInput: searchInput,
        category: menuOptionRef.current?.value || 'Quán ăn'
      }
    });
  };
  const handleKeyDownSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex flexBasis={'45%'}>
      <NestedMenu
        ref={menuOptionRef}
        defaultValue={state ? state.category : ''}
      />
      <Box flexBasis={'80%'}>
        <InputGroup>
          <Input
            type={'text'}
            width={'100%'}
            ref={searchRef}
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
              search.setSearchInput(searchInput);
            }}
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
