import {
  Skeleton,
  Flex,
  Image,
  Box,
  SkeletonText,
  Text,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';

import ModalCustom from '../Modal/ModalCustom';
import SellerFoodItemModal from './SellerFoodItemModal';

import SellerFoodItemDelete from './SellerFoodItemDelete';
import SellerFoodItemEdit from './SellerFoodItemEdit';
import { useFood } from '../../hooks/foods/useFood';

interface FoodHomeItemProps {
  food: Food;
}

const SellerFoodItemManage = React.forwardRef<any, FoodHomeItemProps>(
  (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = useFood(props.food.idFood);
    console.log(data);
    return (
      <CustomCard
        data-id={props.food.idFood}
        cursor={'pointer'}
        role={'group'}
        title={`${props.food.nameFood},${props.food.timeCreate}`}
        onClick={onOpen}
      >
        <Flex flexDirection={'column'} ref={ref}>
          <Skeleton isLoaded={props.food ? true : false}>
            <Box overflow={'hidden'}>
              <Image
                src={data.imageFood || props.food.imageFood}
                alt={props.food.imageFood}
                boxSize={'8rem'}
                width={'100%'}
                transition={'all .2s ease-in'}
                _groupHover={{ transform: 'scale(1.1)' }}
                height={'9rem'}
              />
            </Box>
          </Skeleton>
          <Box px={'.5rem'} pt={'.7rem'}>
            <SkeletonText isLoaded={props.food ? true : false}>
              <Text isTruncated={true}>
                {data.nameFood || props.food.nameFood}
              </Text>
            </SkeletonText>
          </Box>
          <Box width={'25%'} alignSelf={'center'} mx={'.5rem'} my={'.2rem'}>
            <Button size={'md'} height={'2em'} whiteSpace={'nowrap'}>
              Xem chi tiết
            </Button>
          </Box>
        </Flex>
        <ModalCustom
          header={<p>Chi tiết món ăn</p>}
          onClose={onClose}
          isOpen={isOpen}
          body={<SellerFoodItemModal food={data || props.food} />}
          footer={
            <Flex gap={'.5rem'}>
              <SellerFoodItemEdit food={data || props.food} />
              <SellerFoodItemDelete idFood={props.food.idFood} />
            </Flex>
          }
        />
      </CustomCard>
    );
  }
);
SellerFoodItemManage.displayName = 'SellerFoodItemManage';

export default SellerFoodItemManage;
