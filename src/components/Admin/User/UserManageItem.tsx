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
  Textarea,
  Box
} from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import useSWR from 'swr';

import { adminAPI } from '../../../api/repositoryFactory';
import { OrderShipper } from '../../../models/Order.model';
import { User } from '../../../models/User.model';

import {
  convertDateTime,
  toISOLocalString
} from '../../../utils/convertDateTime';
import ModalCustom from '../../Modal/ModalCustom';
interface UserManageItemProps {
  user: User;
  role: string;
}

const UserManageItem = (props: UserManageItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shipModal = useDisclosure();
  const messageRef = React.createRef<HTMLTextAreaElement>();
  const [ships, setShips] = useState<OrderShipper[]>([]);
  const dateRef = React.createRef<HTMLInputElement>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const toast = useToast();
  const { data, mutate } = useSWR(
    `Admin/checkBanGroup/${props.user.idUser}`,

    { refreshInterval: 500 }
  );
  const onGetDetailShip = async () => {
    try {
      adminAPI
        .getSellerShip(+props.user.idUser)
        .then((res) => setShips(res.data));
    } catch (error) {}
  };
  const onBan = async (message: string, type: string) => {
    try {
      // console.log(messageRef.current?.value, dateRef.current?.value);
      mutate();
      const date = dateRef.current?.value
        ? toISOLocalString(new Date(dateRef.current?.value))
        : toISOLocalString(new Date());
      if (type == 'Ban') {
        console.log('Date', date, dateRef.current?.value);
        await adminAPI.banUser(+props.user.idUser, date, message);
      } else if (type == 'Unban') {
        await adminAPI.unbanUser(+props.user.idUser);
      } else if (type == 'Edit') {
        await adminAPI.editBanUser(+props.user.idUser, date, message);
      }
      toast({
        status: 'success',
        title: `${
          isEdit ? 'Chỉnh sửa' : data.enableGroupDetail ? 'Ban' : 'UnBan'
        } thành công`,
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
      setIsEdit(false);
    } catch (err: any) {
      if (props.role == 'shipper') {
        toast({
          status: 'error',
          title: 'Tài khoản đang có đơn hàng , không thể ban',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      } else {
        toast({
          status: 'error',
          title: 'Có lỗi xảy ra vui lòng thử lại',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
      setIsEdit(false);
    } finally {
      mutate();
    }
  };
  console.log(data);
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
        {props.role == 'shipper' ? <Td>{props.user.money}</Td> : null}
        {props.role == 'shipper' || props.role == 'seller' ? (
          <Td>
            <Flex gap={'.5rem'} justifyContent={'center'}>
              {props.role == 'shipper' ? (
                <Button
                  size={'xs'}
                  variant={'outline'}
                  onClick={() => {
                    shipModal.onOpen();
                    onGetDetailShip();
                  }}
                >
                  Chi tiết đơn hàng
                </Button>
              ) : null}
              {data && !data.enableGroupDetail ? (
                <Button
                  size={'xs'}
                  variant={'outline'}
                  onClick={() => {
                    onOpen();
                    setIsEdit(true);
                  }}
                >
                  Chỉnh sửa Ban
                </Button>
              ) : null}
              <Button size={'xs'} colorScheme={'red'} onClick={onOpen}>
                {data?.enableGroupDetail ? 'Ban' : 'Unban'}
              </Button>
            </Flex>
          </Td>
        ) : null}
      </Tr>
      <ModalCustom
        isOpen={shipModal.isOpen}
        onClose={shipModal.onClose}
        header={<Text fontWeight={'bold'}>Chi tiết đơn hàng</Text>}
        body={
          <>
            {ships.length > 0 ? (
              ships.map((ship, index) => (
                <Box
                  key={index}
                  my={'1rem'}
                  boxShadow={'lg'}
                  px={'1rem'}
                  borderColor={'moccasin.50'}
                  borderWidth={'1px'}
                >
                  <Text fontWeight={'bold'} mb={'.5rem'}>
                    ID Đơn hàng:{' '}
                    <Text as={'span'} color={'main.600'}>
                      {ship.idOrderDetail}
                    </Text>
                  </Text>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Avatar src={'/assets/seller.jpg'} />
                    <Text>
                      Ngày đặt món :{' '}
                      {convertDateTime(new Date(ship.timeOrderDetail))}
                    </Text>
                  </Flex>
                </Box>
              ))
            ) : (
              <Text>Chưa có đơn hàng nào</Text>
            )}
          </>
        }
      />
      <ModalCustom
        onClose={() => {
          onClose();
          setIsEdit(false);
        }}
        isOpen={isOpen}
        header={
          <Text fontWeight={'bold'} color={'red'}>
            {isEdit
              ? 'Chỉnh sửa bài viết'
              : `Chú ý về việc ${
                  data?.enableGroupDetail ? 'Ban' : 'Unban'
                } tài khoản
            này`}
          </Text>
        }
        body={
          <>
            {data?.enableGroupDetail || isEdit ? (
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
                          defaultValue={data.timeEnable}
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
                        defaultValue={data.descriptionBan}
                        focusBorderColor={'main.100'}
                      />
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text>Bạn có muốn unban tài khoản này</Text>
            )}
          </>
        }
        footer={
          <Flex gap={'1rem'}>
            <Button variant={'outline'}>Không</Button>
            <Button
              colorScheme={'red'}
              onClick={() => {
                onBan(
                  messageRef.current?.value || '',
                  isEdit ? 'Edit' : data.enableGroupDetail ? 'Ban' : 'Unban'
                );
                onClose();
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

export default memo(UserManageItem);
