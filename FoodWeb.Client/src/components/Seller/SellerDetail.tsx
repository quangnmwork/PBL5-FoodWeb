import React from 'react';
import {
  Flex,
  Icon,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { Seller } from '../../models/User.model';
import { FaRegAddressCard } from 'react-icons/fa';
import { AiOutlinePhone } from 'react-icons/ai';

const SellerDetail = (props: Partial<Seller>) => {
  return (
    <Flex
      flexDirection={'column'}
      marginLeft={'3rem'}
      alignItems={'flex-start'}
    >
      <Text fontSize={'2rem'} color={'richText.100'}>
        {props.nameUser}
      </Text>
      <TableContainer>
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={FaRegAddressCard} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Địa chỉ
                  </Text>
                </Flex>
              </Td>
              <Td>{props.address}</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={AiOutlinePhone} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Số điện thoại
                  </Text>
                </Flex>
              </Td>
              <Td>{props.phone}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default SellerDetail;
