import { useState, useEffect } from 'react';
import { userAPI } from '../../api/repositoryFactory';
import { Payment } from '../../models/Payment.model';

const usePayment = (id: number) => {
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<Payment>();
  useEffect(() => {
    let mounted = true;
    setPaymentLoading(true);
    userAPI
      .getPaymentDetail(id)
      .then((res) => {
        if (mounted) setPayment(res.data);
      })
      .finally(() => {
        setPaymentLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);
  return { payment, paymentLoading };
};
export default usePayment;
