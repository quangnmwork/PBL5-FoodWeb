import {
  Tr,
  Td,
  Avatar,
  Flex,
  Button,
  Text,
  useDisclosure,
  useToast,
  TableContainer,
  Table,
  Tbody,
  Input,
  Textarea
} from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import axiosClient from '../../../api/repository';
import { adminAPI } from '../../../api/repositoryFactory';
import { User } from '../../../models/User.model';
import ModalCustom from '../../Modal/ModalCustom';
interface UserManageItemProps {
  user: User;
  role: string;
}
const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);
const UserManageItem = (props: UserManageItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const messageRef = React.createRef<HTMLTextAreaElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const toast = useToast();
  const { data } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/checkBanGroup/${props.user.idUser}`,
    fetcher,
    { refreshInterval: 500 }
  );
  // console.log(data, error);
  const onBan = async (message: string, type?: string) => {
    try {
      // console.log(messageRef.current?.value, dateRef.current?.value);
      adminAPI.banUser(
        +props.user.idUser,
        dateRef.current?.value ? new Date(dateRef.current?.value) : new Date(),
        message
      );
      toast({
        status: 'success',
        title: 'Ban thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Có lỗi xảy ra vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    }
  };
  return (
    <>
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
            <Flex gap={'.5rem'} justifyContent={'center'}>
              {props.role == 'shipper' ? (
                <Button size={'xs'} variant={'outline'}>
                  Xem chi tiết
                </Button>
              ) : null}
              {!data.enableGroupDetail ? (
                <Button size={'xs'} variant={'outline'}>
                  Chỉnh sửa Ban
                </Button>
              ) : null}
              <Button size={'xs'} colorScheme={'red'} onClick={onOpen}>
                {data.enableGroupDetail ? 'Ban' : 'Unban'}
              </Button>
            </Flex>
          </Td>
        ) : null}
      </Tr>
      <ModalCustom
        onClose={onClose}
        isOpen={isOpen}
        header={
          <Text fontWeight={'bold'} color={'red'}>
            Chú ý về việc {data.enableGroupDetail ? 'Ban' : 'Unbanơ'} tài khoản
            này
          </Text>
        }
        body={
          <TableContainer width={'full'}>
            <Table variant={'unstyled'}>
              <Tbody>
                <Tr>
                  <Td p={0}>Ngày mở khoá ban</Td>
                  <Td>
                    <Input
                      p={0}
                      type={'datetime-local'}
                      width={'100%'}
                      ref={dateRef}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td p={0}>Lý do ban</Td>
                  <Textarea
                    ref={messageRef}
                    placeholder={''}
                    height={'5rem'}
                    focusBorderColor={'main.100'}
                  />
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        }
        footer={
          <Flex gap={'1rem'}>
            <Button variant={'outline'}>Không</Button>
            <Button
              colorScheme={'red'}
              onClick={() => {
                onBan(messageRef.current?.value || '');
              }}
            >
              Có
            </Button>
          </Flex>
        }
      />
    </>
  );
};

export default UserManageItem;
