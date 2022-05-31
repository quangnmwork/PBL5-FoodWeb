import {
  Tr,
  Td,
  Button,
  useDisclosure,
  Flex,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { shipperAPI } from '../../../api/repositoryFactory';

import {
  convertDateTime,
  convertDateTimeDetail
} from '../../../utils/convertDateTime';

import ModalCustom from '../../Modal/ModalCustom';
import { usePermissionDetail } from '../../../hooks/authentication/usePermissionDetail';
import { useCheckban } from '../../../hooks/authentication/useCheckban';
import ModalOrder from '../../Modal/ModalOrder';
import { ReiceiveOrderDetailItem } from '../../../models/Order.model';
interface ShipperOrderItemProps {
  date: string;
  index: number;
  id: number;
  nameCustomer?: string;
  onTick?: any;
}

const ShipperOrderItem = (props: ShipperOrderItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const banModal = useDisclosure();
  const [order, setOrder] = useState<ReiceiveOrderDetailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const permission = usePermissionDetail('Choice_Ship');
  const banned = useCheckban();
  const toast = useToast();
  const warnModal = useDisclosure();
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
        <Td>{props.id}</Td>
        <Td>{props.nameCustomer}</Td>
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
                  warnModal.onOpen();
                }
              }}
            >
              Ship đơn này
            </Button>
          </Flex>
        </Td>
      </Tr>
      <ModalCustom
        isOpen={warnModal.isOpen}
        onClose={warnModal.onClose}
        header={
          <Text color={'red'} fontWeight={'bold'}>
            Cảnh báo
          </Text>
        }
        body={
          <Text>
            Hành động chọn ship này sẽ không được hoàn lại ? Bạn có chắc chắn
            muốn ship đơn này chứ ?{' '}
          </Text>
        }
        footer={
          <Flex gap={'1rem'}>
            <Button colorScheme={'red'} onClick={warnModal.onClose}>
              Không
            </Button>
            <Button
              variant={'outline'}
              isLoading={loading}
              onClick={() => {
                onTickShip();
                warnModal.onClose();
              }}
            >
              Có
            </Button>
          </Flex>
        }
      ></ModalCustom>
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
                <ModalOrder key={food.idFood} food={food} />
              ))}
            </Box>
          ) : null
        }
      />
    </>
  );
};

export default ShipperOrderItem;
