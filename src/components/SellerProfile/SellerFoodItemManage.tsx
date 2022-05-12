import {
  Skeleton,
  Flex,
  Image,
  Box,
  SkeletonText,
  Text,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';

import ModalCustom from '../Modal/ModalCustom';
import SellerFoodItemModal from './SellerFoodItemModal';

import SellerFoodItemDelete from './SellerFoodItemDelete';
import SellerFoodItemEdit from './SellerFoodItemEdit';
import { useFood } from '../../hooks/foods/useFood';
import { sellerAPI } from '../../api/repositoryFactory';

interface FoodHomeItemProps {
  food: Food;
}

const SellerFoodItemManage = React.forwardRef<any, FoodHomeItemProps>(
  (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, mutate } = useFood(props.food.idFood);
    const toast = useToast();

    const onHidden = async () => {
      try {
        const res = await sellerAPI.hiddenFood(data.idFood, !data.isHidden);
        console.log(res);
        mutate();
        toast({
          status: 'success',
          title: `${data.isHidden ? 'Hiện' : 'Mở'} bài viết thành công`,
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      } catch (error: any) {
        toast({
          status: 'error',
          title: 'Có lỗi xảy ra vui lòng thử lại',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      }
    };
    return (
      <CustomCard
        data-id={props.food.idFood}
        cursor={'pointer'}
        role={'group'}
        title={`${props.food.nameFood},${props.food.timeCreate}`}
        filter={'auto'}
        brightness={data?.isHidden ? '80%' : '100%'}
      >
        <Flex flexDirection={'column'} ref={ref}>
          <Skeleton isLoaded={props.food ? true : false}>
            <Box overflow={'hidden'}>
              <Image
                src={data?.imageFood || props.food.imageFood}
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
                {data?.nameFood || props.food.nameFood}
              </Text>
            </SkeletonText>
          </Box>
          <Flex gap={'.5rem'} p={'.5rem'} justifyContent={'center'}>
            <Button
              height={'2em'}
              colorScheme={'red'}
              padding={'.5rem'}
              fontSize={'.8em'}
              onClick={() => {
                onHidden();
              }}
              variant={data?.isHidden ? 'outline' : 'solid'}
            >
              {data?.isHidden ? 'Mở bài viết' : 'Ẩn bài viết'}
            </Button>
            <Button
              size={'md'}
              height={'2em'}
              whiteSpace={'nowrap'}
              padding={'.5rem'}
              fontSize={'.8em'}
              onClick={onOpen}
            >
              Xem chi tiết
            </Button>
          </Flex>
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
