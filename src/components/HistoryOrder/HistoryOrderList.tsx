import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { orderAPI } from '../../api/repositoryFactory';
import { Order } from '../../models/Order.model';

import HistoryFoodOrderDetail from './HistoryFoodOrderDetail';

interface HistoryOrderListProps {
  numberPage: number;
  isShipped: string;
}

const HistoryOrderList = (props: HistoryOrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders([]);
  }, [props.isShipped, props.numberPage]);
  useEffect(() => {
    let mounted = true;
    if (props.isShipped == 'true') {
      orderAPI.getAllOrderShipped(props.numberPage).then((res) => {
        if (mounted) {
          setOrders(res.data);
        }
      });
    } else {
      orderAPI.getAllOrderNotShipped(props.numberPage).then((res) => {
        if (mounted) {
          console.log(res.data);
          setOrders(res.data);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [props.numberPage, props.isShipped]);
  return (
    <>
      {orders.length > 0 ? (
        <TableContainer width={'100%'}>
          <Table variant={'striped'}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Ngày đặt món</Th>
                <Th>Trạng thái</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((orderDetail) => (
                <HistoryFoodOrderDetail
                  key={orderDetail.idOrderDetail}
                  orderDetail={orderDetail}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text fontWeight={'bold'}>Không có đơn hàng nào</Text>
      )}
    </>
  );
};

export default HistoryOrderList;
