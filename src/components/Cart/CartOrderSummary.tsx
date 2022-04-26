import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
        <OrderSummaryItem label="Phí ship">
          <Text>Phí ship</Text>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Tổng cộng
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {cart.getTotalMoney()}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="main"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};
