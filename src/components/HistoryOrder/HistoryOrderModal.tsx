import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { orderAPI } from '../../api/repositoryFactory';
import usePayment from '../../hooks/foods/usePayment';
import { ReiceiveOrderDetailItem } from '../../models/Order.model';

import ModalOrder from '../Modal/ModalOrder';
import PaymentBox from '../Payment/PaymentBox';

interface HistoryOrderModalProps {
  orderDetailId: number;
  address?: string;
}

const HistoryOrderModal = (props: HistoryOrderModalProps) => {
  const [foodsDetail, setFoodsDetail] = useState<ReiceiveOrderDetailItem[]>([]);

  useEffect(() => {
    let mounted = true;
    orderAPI.getAllFoodByOrderId(props.orderDetailId).then((res) => {
      if (mounted) setFoodsDetail(res.data);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const { payment } = usePayment(props.orderDetailId);

  return (
    <Box maxHeight={'25rem'} overflowY={'auto'} id={'modal'} px={'.5rem'}>
      {!payment || <PaymentBox payment={payment} address={props.address} />}
      {foodsDetail.map((food) => (
        <ModalOrder food={food} key={food.idFood} />
      ))}
    </Box>
  );
};

export default HistoryOrderModal;
