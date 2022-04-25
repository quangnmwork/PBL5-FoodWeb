import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Food } from '../../models/Food.model';

const FoodDetailDescription = (props: Partial<Food>) => {
  return (
    <Flex flexDirection={'column'}>
      <Flex
        borderBottom={'1px solid'}
        borderBottomColor={'borderColor.100'}
        alignItems={'center'}
        fontWeight={'bold'}
      >
        <Text pl={'1rem'} py={'1rem'}>
          Thông tin món ăn
        </Text>
      </Flex>
      <Box>
        <Text pl={'1rem'} pt={'.5rem'}>
          {props.descriptionFood || 'Không có mô tả nào'}
        </Text>
      </Box>
    </Flex>
  );
};

export default FoodDetailDescription;
