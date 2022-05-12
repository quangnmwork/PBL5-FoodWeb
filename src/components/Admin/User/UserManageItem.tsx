import { Tr, Td, Avatar, Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { User } from '../../../models/User.model';
interface UserManageItemProps {
  user: User;
  role: string;
}
const UserManageItem = (props: UserManageItemProps) => {
  return (
    <Tr>
      <Td width={'fit-content'}>{props.user.idUser}</Td>
      <Td>
        <Avatar src={props.user.avatar} />
      </Td>
      <Td width={'fit-content'}>{props.user.nameUser}</Td>
      <Td width={'fit-content'}>{props.user.phone}</Td>
      <Td width={'fit-content'}>{props.user.address}</Td>
      {props.role ? <Td>{props.user.money}</Td> : null}
      {props.role == 'shipper' || props.role == 'seller' ? (
        <Td>
          <Flex>
            {props.role == 'shipper' ? (
              <Button size={'xs'} variant={'outline'}>
                Xem chi tiết
              </Button>
            ) : null}
            <Button size={'xs'}>Chỉnh sửa Ban</Button>

            <Button size={'xs'} colorScheme={'red'}>
              Ban
            </Button>
          </Flex>
        </Td>
      ) : null}
    </Tr>
  );
};

export default UserManageItem;
