import {
  Table,
  TableContainer,
  Td,
  Text,
  Thead,
  Tr,
  Th,
  Button,
  Flex,
  Tbody,
  useDisclosure,
  Box,
  Avatar,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { shipperAPI } from '../../../api/repositoryFactory';
import { OrderShipper } from '../../../models/Order.model';
import { convertDateTime } from '../../../utils/convertDateTime';
import CustomCard from '../../Card/CustomCard';
import ModalCustom from '../../Modal/ModalCustom';
import './../pagnitation..css';
interface ReiceiveOrderDetailItem {
  idFood: number;
  nameFood: string;
  numberFood: number;
  imageFood?: string;
}
const MyShip = () => {
  const [ships, setShips] = useState<OrderShipper[]>([]);
  const [order, setOrder] = useState<ReiceiveOrderDetailItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    try {
      setLoading(true);
      let mounted = true;
      const fetching = () => {
        shipperAPI
          .getMyShip()
          .then((res) => {
            if (mounted) setShips(res.data);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      const fetcherInterval = setInterval(() => {
        fetching();
      }, 500);

      return () => {
        mounted = false;
        clearInterval(fetcherInterval);
      };
    } catch (error: any) {}
  }, []);
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
    <Flex
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'60%'}
      mx={'auto'}
    >
      <Text fontWeight={'bold'} my={'1rem'}>
        Đơn hàng đang ship của bạn
      </Text>
      {!loading ? (
        ships.length > 0 ? (
          <TableContainer width={'100%'} mx={'auto'}>
            <Table variant={'striped'}>
              <Thead>
                <Tr>
                  <Th>Số thứ tự</Th>
                  <Th>Tên người đặt</Th>
                  <Th>Ngày đặt món</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {ships.map((ship, index) => (
                  <Tr key={index}>
                    <Td>{index}</Td>
                    <Td>{ship.nameCustomer}</Td>
                    <Td>{convertDateTime(new Date(ship.timeOrderDetail))}</Td>
                    <Td>
                      <Flex gap={'1rem'} justifyContent={'center'}>
                        <Button
                          size={'xs'}
                          onClick={() => {
                            onOpen();
                            onGetDetail(ship.idOrderDetail);
                          }}
                        >
                          Xem chi tiết
                        </Button>
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text fontWeight={'bold'}></Text>
        )
      ) : null}
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
    </Flex>
  );
};

export default MyShip;
