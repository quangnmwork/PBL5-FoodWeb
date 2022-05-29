import {
  Td,
  Tr,
  Button,
  Tag,
  TagLabel,
  useDisclosure,
  Flex
} from '@chakra-ui/react';

import { Order } from '../../models/Order.model';
import { convertDateTime } from '../../utils/convertDateTime';
import ChatContainer from '../Chat/ChatContainer';
import ModalCustom from '../Modal/ModalCustom';
import HistoryOrderModal from './HistoryOrderModal';

interface OrderDetailProps {
  orderDetail: Order;
}
const HistoryFoodOrderDetail = (props: OrderDetailProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleStatus = () => {
    if (props.orderDetail.isShip == true) return 'Đã giao hàng';
    if (props.orderDetail.nameShipper) return 'Đang giao hàng';
    else return 'Chưa nhận đơn hàng';
  };
  const handleTagColor = () => {
    if (handleStatus() === 'Đã giao hàng') return 'main';
    if (handleStatus() === 'Chưa nhận đơn hàng') return 'red';
    if (handleStatus() === 'Đang giao hàng') return 'yellow';
  };
  return (
    <Tr key={props.orderDetail.idOrderDetail}>
      <Td>{props.orderDetail.idOrderDetail}</Td>
      <Td>{convertDateTime(new Date(props.orderDetail.timeOrderDetail))}</Td>
      <Td>
        <Tag colorScheme={handleTagColor()}>
          <TagLabel>{handleStatus()}</TagLabel>
        </Tag>
      </Td>
      <Td>
        <Flex gap={'1rem'}>
          <Button size={'xs'} onClick={onOpen}>
            Xem chi tiết
          </Button>
          {handleStatus() == 'Đang giao hàng' ? (
            <ChatContainer
              idRoom={props.orderDetail.idRoom}
              user={props.orderDetail.nameCustomer}
              idOrder={props.orderDetail.idOrderDetail}
              idUser={props.orderDetail.idCustomer}
            />
          ) : null}
        </Flex>
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
