import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text, Box, Image, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useCart } from '../../services/cart/useCart';
import { Food } from './../../models/Food.model';
interface SellerFoodItemProps {
  food: Food;
}

const SellerFoodItem = React.forwardRef<any, SellerFoodItemProps>(
  (props, ref) => {
    const cart = useCart();
    const addCartHandler = (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const food = {
        idFood: props.food.idFood.toString(),
        numberFood: 1,
        imageFood: props.food.imageFood || '',
        nameFood: props.food.nameFood || '',
        priceFood: props.food.priceFood || 0
      };
      cart.addFood(food);
    };
    return (
      <Flex
        as="div"
        ref={ref}
        alignItems={'flex-start'}
        borderBottom={'1px solid'}
        borderBottomColor={'borderColor.100'}
        width={'90%'}
        mx={'auto'}
        py={'.5rem'}
        px={'1rem'}
      >
        <Box flexBasis={'10%'}>
          <Image
            src={props.food.imageFood}
            alt={props.food.nameFood}
            width={'100%'}
          />
        </Box>
        <Box ml={'1rem'} flexBasis={'60%'}>
          <Text
            fontWeight={'bold'}
            _hover={{ textDecoration: 'underline' }}
            cursor={'pointer'}
          >
            {props.food.nameFood}
          </Text>
        </Box>
        <Flex justifyContent={'space-evenly'} flexBasis={'30%'}>
          <Text color={'main.800'}>{props.food.priceFood}₫</Text>
          <IconButton
            aria-label="Search database"
            icon={<AddIcon />}
            size={'xs'}
            onClick={addCartHandler}
          />
        </Flex>
      </Flex>
    );
  }
);
SellerFoodItem.displayName = 'SellerFoodItem';

export default SellerFoodItem;
