import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  Text,
  Box,
  Image,
  IconButton,
  useDisclosure,
  useToast,
  Button
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/authentication/useUser';
import { useCart } from '../../services/cart/useCart';
import ModalCustom from '../Modal/ModalCustom';
import { Food } from './../../models/Food.model';
import { usePermissionDetail } from '../../hooks/authentication/usePermissionDetail';
interface SellerFoodItemProps {
  food: Food;
}

const SellerFoodItem = React.forwardRef<any, SellerFoodItemProps>(
  (props, ref) => {
    const cart = useCart();
    const { data, error } = useUser();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const permission = usePermissionDetail('Create_Order');
    const addCartHandler = (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (permission.data.enablePermissionDetail == false) {
        toast({
          status: 'error',
          description: 'Hệ thống đang bảo trì , bạn không thể đặt hàng',
          duration: 1500,
          position: 'bottom-right'
        });
        return;
      }
      if (data && !error) {
        const food = {
          idFood: props.food.idFood.toString(),
          numberFood: 1,
          imageFood: props.food.imageFood || '',
          nameFood: props.food.nameFood || '',
          priceFood: props.food.priceFood || 0
        };
        cart.addFood(food);
        toast({
          status: 'success',
          title: 'Thêm vào giỏ thành công',
          position: 'bottom-right',
          duration: 1500,
          variant: 'subtle'
        });
      } else {
      }
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
          <Text color={'main.800'} width={'100%'}>
            {props.food.priceFood}₫
          </Text>
          <IconButton
            aria-label="Search database"
            icon={<AddIcon />}
            size={'xs'}
            onClick={!error ? addCartHandler : onOpen}
          />
        </Flex>
        <ModalCustom
          body={<p>Bạn cần phải đăng nhập trước khi đặt món</p>}
          isOpen={isOpen}
          onClose={onClose}
          header={<p>Chú ý</p>}
          footer={
            <Button
              ml={'.5rem'}
              variant={'outline'}
              onClick={() => {
                navigate('/auth/sign-in', { replace: true });
              }}
            >
              Đăng nhập ngay
            </Button>
          }
        />
      </Flex>
    );
  }
);
SellerFoodItem.displayName = 'SellerFoodItem';

export default SellerFoodItem;
