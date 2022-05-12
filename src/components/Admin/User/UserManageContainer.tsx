import { Search2Icon } from '@chakra-ui/icons';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import UserManagePagnitation from './UserManagePagnitation';

interface UserManageProps {
  nameGroup: string;
}

const UserManageContainer = (props: UserManageProps) => {
  const nameRef = React.createRef<HTMLInputElement>();
  const [name, setName] = useState<string>('');
  const submitSearch = () => {
    setName(nameRef.current?.value || '');
  };
  return (
    <Flex flexDirection={'column'}>
      <Flex mx={'auto'} width={'50%'} my={'1rem'}>
        <Input
          placeholder="Tìm kiếm theo tên , số điện thoại , địa chỉ"
          ref={nameRef}
        />

        <IconButton
          icon={<Search2Icon />}
          aria-label="searching"
          float={'right'}
          onClick={submitSearch}
        ></IconButton>
      </Flex>
      <UserManagePagnitation nameGroup={props.nameGroup} name={name} />
    </Flex>
  );
};

export default UserManageContainer;
