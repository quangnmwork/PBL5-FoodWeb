import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { sellerAPI } from '../../api/repositoryFactory';
import { usePermissionDetail } from '../../hooks/authentication/usePermissionDetail';
import ModalCustom from '../Modal/ModalCustom';
import { Text } from '@chakra-ui/react';

const SellerFoodItemDelete = ({ idFood }: { idFood: number }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const permission = usePermissionDetail('Delete_Food');
  const onDelete = async () => {
    try {
      setLoading(true);
      await sellerAPI.deleteFood(idFood);
      setLoading(false);
      toast({
        status: 'success',
        title: 'Xoá món ăn thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    } catch (err: any) {
      setLoading(false);
      toast({
        status: 'success',
        title: 'Có lỗi xảy ra, vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    }
  };
  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme={'red'}
        onClick={() => {
          if (permission.data.enablePermissionDetail == false) {
            toast({
              status: 'error',
              description: 'Hệ thống đang bảo trì , bạn không thể xoá món ăn',
              duration: 1500,
              position: 'bottom-right'
            });
            return;
          } else {
            onOpen();
          }
        }}
      >
        Xoá món ăn
      </Button>
      <ModalCustom
        header={<Text color={'red'}>Cảnh báo</Text>}
        body={<p>Bạn có chắc xoá món ăn này không</p>}
        onClose={onClose}
        footer={
          <Flex gap={'.5rem'}>
            <Button
              onClick={() => {
                onClose();
              }}
              variant={'outline'}
            >
              Không
            </Button>
            <Button
              onClick={() => {
                onDelete();
                onClose();
              }}
              isLoading={loading}
            >
              Có
            </Button>
          </Flex>
        }
        isOpen={isOpen}
      />
    </>
  );
};

export default SellerFoodItemDelete;
