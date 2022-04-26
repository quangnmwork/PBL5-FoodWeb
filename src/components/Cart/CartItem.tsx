import { CloseButton, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../services/cart/useCart';
import ButtonNumber from '../Button/ButtonNumber';

interface CartItemProps {
  id: string;
  nameFood: string;
  imageFood: string;
  numberFood: number;
  priceFood: number;
}

const CartItem = (props: CartItemProps) => {
  const buttonRef = React.createRef<HTMLInputElement>();
  const [value, setValue] = useState<number>(props.numberFood);
  useEffect(() => {
    updateCartState();
  }, [value]);
  const cart = useCart();
  const updateCartState = () => {
    cart.updateCart(props.id, value);
  };

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.length > 0 ? parseInt(event.target.value) : 1);

    // updateCartState();
  };
  const increase = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValue((prevValue) => prevValue + 1);

    // updateCartState();
  };
  const decrease = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValue((prevValue) => {
      if (prevValue == 1) {
        return 1;
      }
      return prevValue - 1;
    });
    // updateCartState();
  };
  const deleteFood = () => {
    cart.deleteFood(props.id);
  };
  return (
    <Flex
      alignItems={'center'}
      gap={'2rem'}
      _hover={{ backgroundColor: 'bgMain.100' }}
      transition={'all .5s'}
      justifyContent={'space-evenly'}
    >
      <Flex width="full">
        <Image
          src={props.imageFood}
          alt={props.nameFood}
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          loading={'lazy'}
        />
        <Text ml={'1rem'} fontWeight={'bold'}>
          {props.nameFood}
        </Text>
      </Flex>
      <Flex width={'full'}>
        <ButtonNumber
          onChange={handlerOnChange}
          value={value}
          ref={buttonRef}
          increase={increase}
          decrease={decrease}
        />
      </Flex>
      <Flex>
        <Text fontWeight={'semibold'}>{props.priceFood}₫</Text>
      </Flex>
      <Flex>
        <CloseButton
          onClick={() => {
            deleteFood();
          }}
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
