import { Tr, Td, Text, Avatar } from '@chakra-ui/react';
import React from 'react';
import { User } from '../../../models/User.model';
interface UserManageItemProps {
  user: User;
}
const UserManageItem = (props: UserManageItemProps) => {
  return (
    <Tr>
      <Td>{props.user.idUser}</Td>
      <Td>
        <Avatar src={props.user.avatar} />
      </Td>
      <Td p={0}>{props.user.nameUser}</Td>
      <Td>{props.user.phone}</Td>
      <Td p={0}>
        <Text isTruncated={true}>{props.user.address}</Text>
      </Td>
      <Td display={props.user.nameGroup == 'Seller' ? 'block' : 'none'}>
        {props.user.money}
      </Td>
    </Tr>
  );
};

export default UserManageItem;
