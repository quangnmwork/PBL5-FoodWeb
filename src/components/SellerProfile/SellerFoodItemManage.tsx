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
import React, { useState } from 'react';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';

import ModalCustom from '../Modal/ModalCustom';
import SellerFoodItemModal from './SellerFoodItemModal';

import SellerFoodItemDelete from './SellerFoodItemDelete';
import SellerFoodItemEdit from './SellerFoodItemEdit';
import { sellerAPI } from '../../api/repositoryFactory';
import { usePermissionDetail } from '../../hooks/authentication/usePermissionDetail';
import { useCheckban } from '../../hooks/authentication/useCheckban';
import { convertDateTimeDetail } from '../../utils/convertDateTime';
interface FoodHomeItemProps {
  food: Food;
}

const SellerFoodItemManage = React.forwardRef<any, FoodHomeItemProps>(
  (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isHidden, setIsHidden] = useState<boolean>(props.food.isHidden);
    const [hiddenLoading, setHiddenLoading] = useState<boolean>(false);
    const toast = useToast();
    const permission = usePermissionDetail('Hidden_Food');
    const banModal = useDisclosure();
    const banned = useCheckban();
    const onHidden = async () => {
      try {
        setHiddenLoading(true);

        if (
          permission &&
          permission.data &&
          permission.data.enablePermissionDetail == false
        ) {
          toast({
            status: 'error',
            description: 'Hệ thống đang bảo trì , bạn không thể ẩn món ăn',
            duration: 1500,
            position: 'bottom-right'
          });
          return;
        }
        const res = await sellerAPI.hiddenFood(
          props.food.idFood,
          !props.food.isHidden
        );
        console.log(res);

        toast({
          status: 'success',
          title: `${props.food.isHidden ? 'Hiện' : 'Ẩn'} bài viết thành công`,
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
        setIsHidden((prev) => !prev);
      } catch (error: any) {
        toast({
          status: 'error',
          title: 'Có lỗi xảy ra vui lòng thử lại',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      } finally {
        setHiddenLoading(false);
      }
    };
    return (
      <CustomCard
        data-id={props.food.idFood}
        cursor={'pointer'}
        role={'group'}
        title={`${props.food.nameFood},${props.food.timeCreate}`}
        filter={'auto'}
        brightness={isHidden ? '80%' : '100%'}
      >
        <Flex flexDirection={'column'} ref={ref}>
          <Skeleton isLoaded={props.food ? true : false}>
            <Box overflow={'hidden'}>
              <Image
                src={props.food.imageFood || props.food.imageFood}
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
                {props.food.nameFood || props.food.nameFood}
              </Text>
            </SkeletonText>
          </Box>
          <Flex gap={'.5rem'} p={'.5rem'} justifyContent={'center'}>
            <Button
              height={'2em'}
              colorScheme={'red'}
              padding={'.5rem'}
              fontSize={'.8em'}
              isLoading={hiddenLoading}
              onClick={() => {
                if (
                  banned &&
                  banned.data &&
                  banned.data.enableGroupDetail == false
                ) {
                  banModal.onOpen();
                  return;
                }
                onHidden();
              }}
              variant={isHidden ? 'outline' : 'solid'}
            >
              {isHidden ? 'Mở bài viết' : 'Ẩn bài viết'}
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
          body={<SellerFoodItemModal food={props.food} />}
          footer={
            <Flex gap={'.5rem'}>
              <SellerFoodItemEdit food={props.food} />
              <SellerFoodItemDelete idFood={props.food.idFood} />
            </Flex>
          }
        />
        <ModalCustom
          isOpen={banModal.isOpen}
          header={<Text color="red">Tài khoản của bạn đang bị cấm</Text>}
          onClose={banModal.onClose}
          body={
            <Box>
              Chúng tôi xin thông báo bạn đã bị cấm với lí do{' '}
              <Text fontWeight={'bold'}>
                {banned.data?.descriptionBan || ''}
              </Text>{' '}
              . Tài khoản của bạn sẽ được tự động vào{' '}
              {convertDateTimeDetail(new Date(banned.data?.timeEnable))}
            </Box>
          }
        ></ModalCustom>
      </CustomCard>
    );
  }
);
SellerFoodItemManage.displayName = 'SellerFoodItemManage';

export default SellerFoodItemManage;
