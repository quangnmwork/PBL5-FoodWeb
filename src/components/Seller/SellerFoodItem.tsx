import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text, Box, Image, IconButton } from '@chakra-ui/react';
import React from 'react';
import { Food } from './../../models/Food.model';
interface SellerFoodItemProps {
  food: Food;
}

const SellerFoodItem = React.forwardRef<any, SellerFoodItemProps>(
  (props, ref) => {
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
          />
        </Flex>
      </Flex>
    );
  }
);
SellerFoodItem.displayName = 'SellerFoodItem';

export default SellerFoodItem;
