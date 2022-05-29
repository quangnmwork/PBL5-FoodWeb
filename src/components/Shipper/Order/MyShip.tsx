import {
  Table,
  TableContainer,
  Text,
  Thead,
  Tr,
  Th,
  Flex,
  Tbody
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { shipperAPI } from '../../../api/repositoryFactory';
import { OrderShipper } from '../../../models/Order.model';

import './../pagnitation..css';
import MyShipItem from './MyShipItem';

const MyShip = () => {
  const [ships, setShips] = useState<OrderShipper[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

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
                  <Th>ID</Th>
                  <Th>Tên người đặt</Th>
                  <Th>Ngày đặt món</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {ships.map((ship, index) => (
                  <MyShipItem index={index} ship={ship} key={index} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text fontWeight={'bold'}></Text>
        )
      ) : null}
    </Flex>
  );
};

export default MyShip;
