import {
  Tr,
  Td,
  Button,
  useDisclosure,
  Flex,
  Box,
  Avatar,
  Text,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { shipperAPI } from '../../../api/repositoryFactory';

import {
  convertDateTime,
  convertDateTimeDetail
} from '../../../utils/convertDateTime';
import CustomCard from '../../Card/CustomCard';
import ModalCustom from '../../Modal/ModalCustom';
import { usePermissionDetail } from '../../../hooks/authentication/usePermissionDetail';
import { useCheckban } from '../../../hooks/authentication/useCheckban';
interface ShipperOrderItemProps {
  date: string;
  index: number;
  id: number;
  onTick?: any;
}
interface ReiceiveOrderDetailItem {
  idFood: number;
  nameFood: string;
  numberFood: number;
  imageFood?: string;
}
const ShipperOrderItem = (props: ShipperOrderItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const banModal = useDisclosure();
  const [order, setOrder] = useState<ReiceiveOrderDetailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const permission = usePermissionDetail('Choice_Ship');
  const banned = useCheckban();
  const toast = useToast();
  useEffect(() => {
    let mounted = true;
    shipperAPI.getDetailShip(props.id).then((res) => {
      if (mounted) setOrder(res.data);
    });
    return () => {
      mounted = false;
    };
  }, [props.id]);
  const onTickShip = async () => {
    try {
      setLoading(true);

      if (permission.data.enablePermissionDetail == false) {
        toast({
          status: 'error',
          description: 'Hệ thống đang bảo trì , bạn không thể chọn ship',
          duration: 1500,
          position: 'bottom-right'
        });
        setLoading(false);
        return;
      }
      await shipperAPI.choiceShip(props.id, true);
      toast({
        status: 'success',
        title: 'Chọn ship thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        status: 'error',
        title: 'Không thể chọn quá 5 đơn hàng',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    }
  };
  return (
    <>
      <Tr>
        <Td>{props.index}</Td>
        <Td width={'fit-content'}>{convertDateTime(new Date(props.date))}</Td>
        <Td width={'fit-content'}>
          <Flex gap={'1rem'} justifyContent={'center'}>
            <Button size={'xs'} onClick={onOpen}>
              Xem chi tiết
            </Button>
            <Button
              size={'xs'}
              variant={'outline'}
              onClick={() => {
                if (banned.data.enableGroupDetail == false) {
                  banModal.onOpen();
                } else {
                  onTickShip();
                }
              }}
              isLoading={loading}
            >
              Ship đơn này
            </Button>
          </Flex>
        </Td>
      </Tr>
      <ModalCustom
        isOpen={banModal.isOpen}
        header={<Text color="red">Tài khoản của bạn đang bị cấm</Text>}
        onClose={banModal.onClose}
        body={
          <Box>
            Chúng tôi xin thông báo bạn đã bị cấm với lí do{' '}
            <Text fontWeight={'bold'}>{banned.data?.descriptionBan || ''}</Text>{' '}
            . Tài khoản của bạn sẽ được tự động vào{' '}
            {convertDateTimeDetail(new Date(banned.data?.timeEnable))}
          </Box>
        }
      ></ModalCustom>
      <ModalCustom
        header={<p>Chi tiết đơn hàng</p>}
        isOpen={isOpen}
        onClose={onClose}
        body={
          order ? (
            <Box
              maxHeight={'20rem'}
              overflowY={'auto'}
              id={'modal'}
              px={'.5rem'}
            >
              {order.map((food) => (
                <CustomCard
                  key={food.idFood}
                  px={'1rem'}
                  py={'.5rem'}
                  my={'.5rem'}
                >
                  <Flex justifyContent={'space-between'}>
                    <Flex>
                      <Avatar src={food.imageFood || '/assets/no-image.png'} />
                      <Text ml={'.5rem'} fontWeight={'semibold'}>
                        {food.nameFood}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight={'semibold'}>
                        Số lượng : {food.numberFood}
                      </Text>
                    </Flex>
                  </Flex>
                </CustomCard>
              ))}
            </Box>
          ) : null
        }
      />
    </>
  );
};

export default ShipperOrderItem;
