import { Flex, useToast, Text, Button, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import { adminAPI } from '../../../api/repositoryFactory';
import useSWR from 'swr';

import { PermissionGroup } from '../../../models/Permission.model';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

interface GroupItemProps {
  permission: Pick<
    PermissionGroup,
    'codePermissionDetail' | 'nameGroup' | 'namePermission'
  >;
}

const GroupItem = (props: GroupItemProps) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>();

  const { data, mutate } = useSWR(
    `Admin/getPermissionDetailByCode/${props.permission.codePermissionDetail}`
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

      await adminAPI.setGroupPermission(code, enable);
      mutate();
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

  return (
    <Flex alignItems={'center'} my={'.5rem'}>
      <Text fontWeight={'bold'} color={'moccasin.500'} mr={'1rem'}>
        {props.permission.namePermission}
      </Text>

      <Skeleton isLoaded={data}>
        <Button
          isLoading={loading}
          variant={data?.enablePermissionDetail == true ? 'outline' : 'solid'}
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
      </Skeleton>
    </Flex>
  );
};

export default GroupItem;
