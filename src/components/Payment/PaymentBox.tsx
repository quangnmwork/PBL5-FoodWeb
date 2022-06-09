import { Table, TableContainer, Tbody, Td, Tr, Text } from '@chakra-ui/react';
import { useUser } from '../../hooks/authentication/useUser';
import { Payment } from '../../models/Payment.model';
import { convertDateTime } from '../../utils/convertDateTime';
interface PaymentBoxProps {
  payment: Payment;
  address?: string;
}
const PaymentBox = (props: PaymentBoxProps) => {
  const { payment, address } = props;
  const { data } = useUser();
  const dispalyTotal = () => {
    if (data) {
      if (data.nameGroup == 'Customer') return;
      else return 'none';
    }
    return 'none';
  };
  return (
    <>
      <TableContainer>
        <Table variant={'striped'}>
          <Tbody>
            <Tr display={payment.isPayment ? 'block' : 'none'}>
              <Td> Thời gian thanh toán :</Td>
              <Td>{convertDateTime(payment.timePayment || new Date())}</Td>
            </Tr>
            <Tr>
              <Td>Tổng tiền đồ ăn</Td>
              <Td>{payment.priceTotalFood}</Td>
            </Tr>
            <Tr>
              <Td>Phí ship</Td>
              <Td>{payment.priceShip}</Td>
            </Tr>
            <Tr display={dispalyTotal()}>
              <Td>Tổng tiền thanh toán</Td>
              <Td>{payment.priceShip + payment.priceTotalFood}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text
        mt={'1rem'}
        fontWeight={'bold'}
        display={address ? 'block' : 'none'}
      >
        {'Địa chỉ giao hàng: '}
        <Text as={'span'} color={'main.600'} ml={'.5rem'}>
          {address}
        </Text>
      </Text>
    </>
  );
};

export default PaymentBox;
