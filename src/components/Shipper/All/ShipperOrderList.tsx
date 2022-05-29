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
import ShipperOrderItem from './ShipperOrderItem';
interface ShipperOrderListProps {
  pageNumber: number;
}
const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const ShipperOrderList = (props: ShipperOrderListProps) => {
  const { data, error } = useSWR(
    `https://localhost:5001/OrderDetail/getListOrderDetailChoiceShip/page-${props.pageNumber}`,
    fetcher,
    { refreshInterval: 500 }
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
      <Text fontWeight={'bold'} textAlign={'left'} my={'1rem'}>
        Danh sách đơn hàng đang chờ ship
      </Text>
      <TableContainer>
        {!error ? (
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
              {data
                ? data.map((order: any, index: number) => (
                    <ShipperOrderItem
                      key={index}
                      date={order.timeOrderDetail}
                      nameCustomer={order.nameCustomer}
                      index={index}
                      id={order.idOrderDetail}
                    />
                  ))
                : null}
            </Tbody>
          </Table>
        ) : null}
      </TableContainer>
    </Flex>
  );
};

export default ShipperOrderList;
