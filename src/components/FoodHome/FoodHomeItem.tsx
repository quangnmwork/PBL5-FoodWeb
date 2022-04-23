import {
  Skeleton,
  Flex,
  Image,
  Box,
  SkeletonText,
  Text,
  Divider
} from '@chakra-ui/react';
import React from 'react';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';
interface FoodHomeItemProps {
  food: Food;
}

const FoodHomeItem = React.forwardRef<any, FoodHomeItemProps>((props, ref) => {
  return (
    <CustomCard
      data-id={props.food.idFood}
      cursor={'pointer'}
      role={'group'}
      title={`${props.food.nameFood},${props.food.timeCreate}`}
    >
      <Flex flexDirection={'column'} ref={ref}>
        <Skeleton isLoaded={props.food ? true : false}>
          <Box overflow={'hidden'}>
            <Image
              src={props.food.imageFood}
              alt={props.food.imageFood}
              boxSize={'8rem'}
              width={'100%'}
              transition={'all .2s ease-in'}
              _groupHover={{ transform: 'scale(1.1)' }}
              height={'9rem'}
            />
          </Box>
        </Skeleton>
        <Box px={'.5rem'} py={'.7rem'}>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true}>{props.food.nameFood}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true}>{props.food.descriptionFood}</Text>
          </SkeletonText>
          <Divider />
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true} textColor="red">
              {props.food.priceFood}₫
            </Text>
          </SkeletonText>
        </Box>
      </Flex>
    </CustomCard>
  );
});
FoodHomeItem.displayName = 'FoodHomeItem';

export default FoodHomeItem;
