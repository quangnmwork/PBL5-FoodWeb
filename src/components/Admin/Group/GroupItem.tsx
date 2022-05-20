import { Flex, useToast, Text, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { adminAPI } from '../../../api/repositoryFactory';
import useSWR from 'swr';
import axiosClient from '../../../api/repository';
import { PermissionGroup } from '../../../models/Permission.model';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

interface GroupItemProps {
  permission: Pick<
    PermissionGroup,
    'codePermissionDetail' | 'nameGroup' | 'namePermission'
  >;
}

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const GroupItem = (props: GroupItemProps) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>();

  const { data } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/getPermissionDetailByCode/${props.permission.codePermissionDetail}`,
    fetcher,
    { refreshInterval: 100 }
  );
  const currentState = data?.enablePermissionDetail
    ? `Tắt quyền ${props.permission.namePermission}`
    : `Bật quyền ${props.permission.namePermission}`;

  const onChangeEnable = async (
    code: string,
    enable: boolean,
    permissionName?: string
  ) => {
    try {
      setLoading(true);
      console.log(enable);
      await adminAPI.setGroupPermission(code, enable);
      toast({
        status: 'success',
        title: `${enable ? 'Tắt' : 'Bật'} quyền ${permissionName} thành công`,
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Có lỗi xảy ra vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    } finally {
      setLoading(false);
    }
  };
  console.log('Group', data?.enablePermissionDetail);
  return (
    <Flex alignItems={'center'}>
      <Text fontWeight={'bold'} color={'moccasin.500'} mr={'1rem'}>
        {props.permission.namePermission}
      </Text>

      <Button
        isLoading={loading}
        variant={'outline'}
        rightIcon={
          data?.enablePermissionDetail == true ? (
            <AiOutlineLock />
          ) : (
            <AiOutlineUnlock />
          )
        }
        onClick={() => {
          onChangeEnable(
            props.permission.codePermissionDetail,
            data?.enablePermissionDetail == true ? false : true,
            props.permission.namePermission
          );
        }}
      >
        {currentState}
      </Button>
    </Flex>
  );
};

export default GroupItem;
