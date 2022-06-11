import {
  TableContainer,
  Thead,
  Tr,
  Table,
  Th,
  Tbody,
  Flex,
  Text
} from '@chakra-ui/react';

import useSWR from 'swr';
import axiosClient from '../../../api/repository';
import { MAX_TIME } from '../../../utils/constants';
import ShipperOrderItem from './ShipperOrderItem';
interface ShipperOrderListProps {
  pageNumber: number;
}
const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const ShipperOrderList = (props: ShipperOrderListProps) => {
  const { data, mutate } = useSWR(
    `https://localhost:5001/OrderDetail/getListOrderDetailChoiceShip/page-${props.pageNumber}`,
    fetcher,
    { refreshInterval: MAX_TIME }
  );

  return (
    <Flex
      flexDirection={'column'}
      width={'70%'}
      px={'3rem'}
      py={'1rem'}
      borderWidth={'1px'}
      borderColor={'moccasin.100'}
      boxShadow={'lg'}
    >
      <Text fontWeight={'bold'} textAlign={'left'} my={'1rem'} fontSize={'2xl'}>
        Danh sách đơn hàng đang chờ ship
      </Text>
      <TableContainer>
        <Table variant={'striped'}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên người đặt</Th>
              <Th>Ngày đặt món</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.length > 0
              ? data.map((order: any, index: number) => (
                  <ShipperOrderItem
                    key={index}
                    date={order.timeOrderDetail}
                    mutate={mutate}
                    nameCustomer={order.nameCustomer}
                    index={index}
                    id={order.idOrderDetail}
                    addressCustomer={order.addressCustomer}
                  />
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ShipperOrderList;
