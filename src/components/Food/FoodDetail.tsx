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
import { AiFillTags } from 'react-icons/ai';
import { IoTodaySharp } from 'react-icons/io5';
import { MdAttachMoney } from 'react-icons/md';
import { Food } from '../../models/Food.model';
import ButtonNumber from '../Button/ButtonNumber';
import FoodOrderButton from './FoodOrderButton';

const FoodDetail = (props: Partial<Food>) => {
  return (
    <Flex
      flexDirection={'column'}
      marginLeft={'3rem'}
      alignItems={'flex-start'}
    >
      <Text fontSize={'2rem'} color={'richText.100'}>
        {props.nameFood}
      </Text>
      <TableContainer>
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={AiFillTags} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Loại thực phẩm:
                  </Text>
                </Flex>
              </Td>
              <Td>{props.nameCategory}</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={MdAttachMoney} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Giá bán
                  </Text>
                </Flex>
              </Td>
              <Td>{props.priceFood}₫</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={IoTodaySharp} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Ngày tạo
                  </Text>
                </Flex>
              </Td>
              <Td>metres (m)</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>Số lượng</Td>
              <Td>
                <ButtonNumber />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <FoodOrderButton />
    </Flex>
  );
};

export default FoodDetail;
