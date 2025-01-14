import {
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
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
interface FoodHomeItemProps {
  food: Food;
}

const FoodHomeItem = React.forwardRef<any, FoodHomeItemProps>((props, ref) => {
  const navigate = useNavigate();
  return (
    <CustomCard
      data-id={props.food.idFood}
      cursor={'pointer'}
      role={'group'}
      title={`${props.food.nameFood},${props.food.timeCreate}`}
      onClick={() => {
        navigate(`/food/${props.food.idFood}`);
      }}
    >
      <Flex flexDirection={'column'} ref={ref} width={'12rem'}>
        <LazyLoad offset={20} height={100}>
          <Box overflow={'hidden'}>
            <Image
              src={props.food.imageFood}
              alt={props.food.nameFood}
              boxSize={'8rem'}
              width={'100%'}
              transition={'all .2s ease-in'}
              _groupHover={{ transform: 'scale(1.1)' }}
              height={'9rem'}
            />
          </Box>
        </LazyLoad>

        <Box px={'.5rem'} pt={'.7rem'}>
          <SkeletonText isLoaded={props.food ? true : false}>
            <Text isTruncated={true}>{props.food.nameFood}</Text>
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
