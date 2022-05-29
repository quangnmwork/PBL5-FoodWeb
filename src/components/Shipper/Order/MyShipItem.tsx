import {
  Td,
  Button,
  Tr,
  useToast,
  useDisclosure,
  Flex,
  Avatar,
  Text,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { shipperAPI } from '../../../api/repositoryFactory';
import { OrderShipper } from '../../../models/Order.model';
import { convertDateTime } from '../../../utils/convertDateTime';
import CustomCard from '../../Card/CustomCard';
import ChatContainer from '../../Chat/ChatContainer';

import ModalCustom from '../../Modal/ModalCustom';
interface MyShipItemProps {
  ship: OrderShipper;
  index: number;
}
interface ReiceiveOrderDetailItem {
  idFood: number;
  nameFood: string;
  numberFood: number;
  imageFood?: string;
}
const MyShipItem = (props: MyShipItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ship } = props;
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

export default MyShipItem;
