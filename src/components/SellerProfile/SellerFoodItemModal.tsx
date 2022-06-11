import { Image, Box, Flex, Text } from '@chakra-ui/react';

import { Food } from '../../models/Food.model';
import { convertDateTime } from '../../utils/convertDateTime';
interface SellerFoodItemModalProps {
  food: Food;
}
const SellerFoodItemModal = (props: SellerFoodItemModalProps) => {
  return (
    <Flex flexDirection={'column'}>
      <Flex alignItems={'center'} gap={'1rem'}>
        <Box width={'100%'}>
          <Image src={props.food.imageFood} width={'100%'} />
        </Box>
        <Flex flexDirection={'column'} alignItems={'flex-start'} width={'100%'}>
          <Box>Giá : {props.food.priceFood}</Box>
          <Box>
            Ngày tạo : {convertDateTime(new Date(props.food.timeCreate))}
          </Box>
          <Box>Phân loại : {props.food.nameCategory}</Box>
        </Flex>
      </Flex>{' '}
      <Box mt={'1rem'}>
        <Text fontWeight={'semibold'}>Thông tin món ăn</Text>
        <Text>
          {props.food.descriptionFood.length > 0
            ? props.food.descriptionFood
            : 'Chưa có mô tả nào'}
        </Text>
      </Box>
    </Flex>
  );
};

export default SellerFoodItemModal;
