import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { orderAPI } from '../../api/repositoryFactory';
import { Order } from '../../models/Order.model';

import HistoryFoodOrderDetail from './HistoryFoodOrderDetail';

interface HistoryOrderListProps {
  numberPage: number;
  isShipped: string;
}

const HistoryOrderList = (props: HistoryOrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setOrders([]);
  }, [props.isShipped, props.numberPage]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (props.isShipped == 'ship') {
      orderAPI
        .getAllOrderShipped(props.numberPage)
        .then((res) => {
          if (mounted) {
            setOrders(res.data);
          }
        })
        .finally(() => setLoading(false));
    } else if (props.isShipped == 'not-ship') {
      orderAPI
        .getAllOrderNotShipped(props.numberPage)
        .then((res) => {
          if (mounted) {
            const orderData = res.data.filter(
              (order: any) => !order.nameShipper
            );

            setOrders(orderData);
          }
        })
        .finally(() => setLoading(false));
    } else {
      orderAPI.getAllOrderNotShipped(props.numberPage).then((res) => {
        if (mounted) {
          //console.log(res.data);

          const orderData = res.data
            .filter((order: any) => order.nameShipper)
            .finally(() => setLoading(false));

          setOrders(orderData);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [props.numberPage, props.isShipped]);
  return (
    <>
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
            {orders.length > 0 && !loading
              ? orders.map((orderDetail) => (
                  <HistoryFoodOrderDetail
                    key={orderDetail.idOrderDetail}
                    orderDetail={orderDetail}
                  />
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryOrderList;
