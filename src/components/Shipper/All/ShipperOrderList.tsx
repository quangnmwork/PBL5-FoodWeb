import { TableContainer, Thead, Tr, Table, Th, Tbody } from '@chakra-ui/react';

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
    <TableContainer width={'100%'}>
      {!error ? (
        <Table variant={'striped'}>
          <Thead>
            <Tr>
              <Th>Số thứ tự</Th>
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
                    index={index}
                    id={order.idOrderDetail}
                  />
                ))
              : null}
          </Tbody>
        </Table>
      ) : null}
    </TableContainer>
  );
};

export default ShipperOrderList;
