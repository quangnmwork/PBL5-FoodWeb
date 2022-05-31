import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';
import { orderAPI } from '../../api/repositoryFactory';

import { useCart } from '../../services/cart/useCart';

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const cart = useCart();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const orderHandler = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    try {
      event.preventDefault();
      setLoading(true);
      if (!cart.getLengthCartProducs()) {
        throw new Error('Đơn hàng không được trống');
      }
      const res = await orderAPI.createOrderDetail(cart.getCartForOrder());
      if (res.status == 200) {
        setLoading(false);
        toast({
          status: 'success',
          title: 'Đặt hàng thành công',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.message) {
        toast({
          status: 'error',
          title: `${error.message}`,
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      } else {
        toast({
          status: 'error',
          title: 'Có lỗi xảy ra vui lòng thử lại',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
    }
  };
  return (
    <Stack
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      flexBasis={'35%'}
    >
      <Heading size="md">Đơn hàng</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Đơn giá">
          <Text>{cart.getTotalMoney()}</Text>
        </OrderSummaryItem>
        <OrderSummaryItem label="Phí ship">
          <Text>{(cart.getTotalMoney() * 1) / 10}</Text>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Tổng cộng
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {cart.getTotalMoney() + (cart.getTotalMoney() * 1) / 10}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="main"
        size="lg"
        fontSize="md"
        onClick={orderHandler}
        isLoading={loading}
      >
        Đặt hàng
      </Button>
    </Stack>
  );
};
