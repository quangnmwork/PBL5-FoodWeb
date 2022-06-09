import {
  Td,
  Button,
  Tr,
  useToast,
  useDisclosure,
  Flex,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { shipperAPI } from '../../../api/repositoryFactory';
import usePayment from '../../../hooks/foods/usePayment';
import {
  OrderShipper,
  ReiceiveOrderDetailItem
} from '../../../models/Order.model';
import { convertDateTime } from '../../../utils/convertDateTime';

import ChatContainer from '../../Chat/ChatContainer';

import ModalCustom from '../../Modal/ModalCustom';
import ModalOrder from '../../Modal/ModalOrder';
import PaymentBox from '../../Payment/PaymentBox';
interface MyShipItemProps {
  ship: OrderShipper;
  index: number;
}

const MyShipItem = (props: MyShipItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ship } = props;
  const { payment } = usePayment(props.ship.idOrderDetail);
  const toast = useToast();
  const [order, setOrder] = useState<ReiceiveOrderDetailItem[]>([]);
  const onGetDetail = async (id: number) => {
    try {
      await shipperAPI.getDetailShip(id).then((res) => setOrder(res.data));
    } catch (error: any) {}
  };
  const onTickShip = async (id: number) => {
    try {
      await shipperAPI.tickShip(id);
      toast({
        status: 'success',
        title: 'Bạn đã ship thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast({
        status: 'error',
        title: 'Có lỗi xảy ra vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    } finally {
    }
  };
  return (
    <>
      <Tr>
        <Td>{ship.idOrderDetail}</Td>
        <Td>{ship.nameCustomer}</Td>
        <Td>{convertDateTime(new Date(ship.timeOrderDetail))}</Td>
        <Td>
          <Flex gap={'.5rem'} justifyContent={'center'}>
            <Button
              size={'xs'}
              onClick={() => {
                onOpen();
                onGetDetail(ship.idOrderDetail);
              }}
            >
              Xem chi tiết
            </Button>
            <ChatContainer
              idRoom={ship.idRoom}
              user={ship.nameShipper}
              idOrder={ship.idOrderDetail}
              idUser={ship.idShipper}
            />
            <Button
              variant="outline"
              size={'xs'}
              onClick={() => {
                onTickShip(ship.idOrderDetail);
              }}
            >
              Đã ship
            </Button>
          </Flex>
        </Td>
      </Tr>

      <ModalCustom
        header={<p>Chi tiết đơn hàng</p>}
        isOpen={isOpen}
        onClose={onClose}
        body={
          order && payment ? (
            <>
              <PaymentBox payment={payment} address={ship.addressCustomer} />
              <Box
                maxHeight={'25rem'}
                overflowY={'auto'}
                id={'modal'}
                px={'.5rem'}
              >
                {order.map((food) => (
                  <ModalOrder key={food.idFood} food={food} />
                ))}
              </Box>
            </>
          ) : null
        }
      />
    </>
  );
};

export default MyShipItem;
