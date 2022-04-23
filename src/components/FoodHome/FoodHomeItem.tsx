import {
  Skeleton,
  Flex,
  Image,
  Box,
  SkeletonText,
  Text,
  Divider,
  Icon
} from '@chakra-ui/react';
import React from 'react';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';
import { AiFillTags } from 'react-icons/ai';
import { motion } from 'framer-motion';
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
      as={motion.div}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ delay: '0.5' }}
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
        <Box px={'.5rem'} pt={'.7rem'}>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true}>{props.food.nameFood}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true}>{props.food.descriptionFood}</Text>
          </SkeletonText>
          <Divider />
        </Box>
        <Flex justifyContent={'space-between'} py={'.2rem'} px={'.3rem'}>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Flex alignItems={'center'}>
              <Icon as={AiFillTags} w={4} h={4} color={'main.800'} />
              <Text isTruncated={true} textColor="main.800">
                {props.food.nameCategory}
              </Text>
            </Flex>
          </SkeletonText>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true} textColor="main.800">
              {props.food.priceFood}₫
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>
    </CustomCard>
  );
});
FoodHomeItem.displayName = 'FoodHomeItem';

export default FoodHomeItem;
