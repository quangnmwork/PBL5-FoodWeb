import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useUser } from '../../hooks/authentication/useUser';
import { Payment } from '../../models/Payment.model';
import { convertDateTime } from '../../utils/convertDateTime';
interface PaymentBoxProps {
  payment: Payment;
}
const PaymentBox = (props: PaymentBoxProps) => {
  const { payment } = props;
  const { data } = useUser();
  const dispalyTotal = () => {
    if (data) {
      if (data.nameGroup == 'Customer') return 'block';
      else return 'none';
    }
    return 'none';
  };
  return (
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
  );
};

export default PaymentBox;
