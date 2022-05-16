import { Box, Flex, Switch, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import axiosClient from '../../../api/repository';
import { adminAPI } from '../../../api/repositoryFactory';

const fetcher = async (url: string) =>
  axiosClient.get(url).then((res) => res.data);

const GroupContainer = () => {
  const { data } = useSWR(
    `${process.env.REACT_APP_DOMAIN}Admin/getListPermissionDetail`,
    fetcher,
    { refreshInterval: 200 }
  );
  const toast = useToast();
  const newData = data || [];
  const onChangeEnable = async (
    code: string,
    enable: boolean,
    permissionName?: string
  ) => {
    try {
      console.log(enable);
      await adminAPI.setGroupPermission(code, enable);
      toast({
        status: 'success',
        title: `${enable ? 'Bật' : 'Tắt'} quyền ${permissionName} thành công`,
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
    }
  };
  return (
    <Flex flexDirection={'column'}>
      <Text fontWeight={'bold'} fontSize={'2xl'}>
        Quản lý quyền group
      </Text>
      <Box>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Quản lý quyền customer
        </Text>
        {newData.map((item: any, index: number) =>
          item?.nameGroup == 'Customer' ? (
            <Flex alignItems={'center'} key={index}>
              <Text fontWeight={'bold'} color={'moccasin.500'}>
                {item?.namePermission}
              </Text>
              <Switch
                defaultChecked={item?.enablePermissionDetail}
                colorScheme={'main'}
                onChange={() => {
                  onChangeEnable(
                    item?.codePermissionDetail,
                    item.enablePermissionDetail == true ? false : true,
                    item?.namePermission
                  );
                }}
              ></Switch>
            </Flex>
          ) : null
        )}
      </Box>
      <Box>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Quản lý quyền seller
        </Text>
        {newData.map((item: any, index: number) =>
          item?.nameGroup == 'Seller' ? (
            <Flex alignItems={'center'} key={index}>
              <Text fontWeight={'bold'} color={'moccasin.500'}>
                {item?.namePermission}
              </Text>
              <Switch
                defaultChecked={item?.enablePermissionDetail || true}
                colorScheme={'main'}
                onChange={() => {
                  onChangeEnable(
                    item?.codePermissionDetail,
                    item?.enablePermissionDetail == true ? false : true,
                    item?.namePermission
                  );
                }}
              ></Switch>
            </Flex>
          ) : null
        )}
      </Box>
      <Box>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Quản lý quyền shipper
        </Text>
        {newData.map((item: any, index: number) =>
          item?.nameGroup == 'Shipper' ? (
            <Flex alignItems={'center'} key={index}>
              <Text fontWeight={'bold'} color={'moccasin.500'}>
                {item?.namePermission}
              </Text>
              <Switch
                defaultChecked={item?.enablePermissionDetail || true}
                colorScheme={'main'}
                onChange={() => {
                  onChangeEnable(
                    item?.codePermissionDetail,
                    item?.enablePermissionDetail == true ? false : true,
                    item?.namePermission
                  );
                }}
              ></Switch>
            </Flex>
          ) : null
        )}
      </Box>
    </Flex>
  );
};

export default GroupContainer;
