import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../../api/repositoryFactory';
import { User } from '../../../models/User.model';
import UserManageItem from './UserManageItem';
interface UserManageListProps {
  currentPage: number;
  role: string;
  name?: string;
  phone?: string;
  address?: string;
  loading: boolean;
}
const UserManageList = (props: UserManageListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    adminAPI
      .getUserOfRoleBySearch(
        props.role,
        props.name || '',
        props.phone || '',
        props.address || '',
        props.currentPage
      )
      .then((res) => {
        if (mounted) setUsers(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [props.currentPage, props.name, props.address, props.phone]);
  console.log(users.length);
  return (
    <>
      {!loading ? (
        <TableContainer
          textOverflow={'ellipsis'}
          whiteSpace={'pre-wrap'}
          overflowY={'auto'}
        >
          <Table variant={'striped'}>
            <>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Ảnh đại diện</Th>
                  <Th>Tên người dùng</Th>
                  <Th>Số điện thoại</Th>
                  <Th>Địa chỉ</Th>
                  <Th display={props.role == 'shipper' ? 'block' : 'none'}>
                    Tiền kiếm được
                  </Th>
                  {props.role == 'shipper' || props.role == 'seller' ? (
                    <Th></Th>
                  ) : null}
                </Tr>
              </Thead>
              <Tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <UserManageItem key={index} user={user} role={props.role} />
                  ))
                ) : (
                  <Text fontWeight={'bold'}>Không có kết quả tìm kiếm</Text>
                )}
              </Tbody>
            </>
            )
          </Table>
        </TableContainer>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="main.300"
          size="xl"
        />
      )}
    </>
  );
};

export default UserManageList;
