import { Search2Icon } from '@chakra-ui/icons';
import { Button, Flex, FormControl } from '@chakra-ui/react';
import React, { useState } from 'react';
import FormInput from '../../Form/FormInput';

import UserManagePagnitation from './UserManagePagnitation';

interface UserManageProps {
  nameGroup: string;
}

const UserManageContainer = (props: UserManageProps) => {
  const nameRef = React.createRef<HTMLInputElement>();
  const phoneRef = React.createRef<HTMLInputElement>();
  const addressRef = React.createRef<HTMLInputElement>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const submitSearch = () => {
    setName(nameRef.current?.value || '');
    setPhone(phoneRef.current?.value || '');
    setAddress(addressRef.current?.value || '');
  };
  return (
    <Flex flexDirection={'column'}>
      <FormControl
        mx={'auto'}
        width={'50%'}
        my={'1rem'}
        borderColor={'moccasin.100'}
        borderWidth={'1px'}
        boxShadow={'sm'}
        p={'1.5rem'}
      >
        <FormInput textLabel="Tên người dùng" ref={nameRef} />
        <FormInput textLabel="Số điện thoại" ref={phoneRef} />
        <FormInput textLabel="Địa chỉ" ref={addressRef} />
        <Button
          rightIcon={<Search2Icon />}
          float={'right'}
          onClick={submitSearch}
        >
          Tìm kiếm
        </Button>
      </FormControl>
      <UserManagePagnitation
        nameGroup={props.nameGroup}
        name={name}
        address={address}
        phone={phone}
      />
    </Flex>
  );
};

export default UserManageContainer;
