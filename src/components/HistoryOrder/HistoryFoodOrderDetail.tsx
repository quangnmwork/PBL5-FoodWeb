import { Td, Tr, Button, Tag, TagLabel, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Order } from '../../models/Order.model';
import { convertDateTime } from '../../utils/convertDateTime';
import ModalCustom from '../Modal/ModalCustom';
import HistoryOrderModal from './HistoryOrderModal';

interface OrderDetailProps {
  orderDetail: Order;
}
const HistoryFoodOrderDetail = (props: OrderDetailProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Tr key={props.orderDetail.idOrderDetail}>
      <Td>{props.orderDetail.idOrderDetail}</Td>
      <Td>{convertDateTime(new Date(props.orderDetail.timeOrderDetail))}</Td>
      <Td>
        <Tag colorScheme={props.orderDetail.isShip ? 'main' : 'red'}>
          <TagLabel>
            {props.orderDetail.isShip ? 'Đã ship' : 'Chưa ship'}
          </TagLabel>
        </Tag>
      </Td>
      <Td>
        <Button size={'xs'} onClick={onOpen}>
          Xem chi tiết
        </Button>
      </Td>
      <ModalCustom
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        header={'Chi tiết đơn hàng'}
        body={
          <HistoryOrderModal orderDetailId={props.orderDetail.idOrderDetail} />
        }
      />
    </Tr>
  );
};

export default HistoryFoodOrderDetail;
