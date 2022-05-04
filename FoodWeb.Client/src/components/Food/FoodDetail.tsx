import {
  Flex,
  Icon,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import React from 'react';
import { AiFillTags } from 'react-icons/ai';
import { IoTodaySharp } from 'react-icons/io5';
import { MdAttachMoney } from 'react-icons/md';
import { Food } from '../../models/Food.model';
import ButtonNumber from '../Button/ButtonNumber';
import ButtonCustom from '../Button/ButtonCustom';
import { useCart } from '../../services/cart/useCart';
import { convertDateTime } from '../../utils/convertDateTime';
import ModalCustom from '../Modal/ModalCustom';
import { useUser } from '../../hooks/authentication/useUser';
import { useNavigate } from 'react-router-dom';

const FoodDetail = (props: Partial<Food>) => {
  const numberButtonRef = React.createRef<HTMLInputElement>();
  const cart = useCart();
  const { data, error } = useUser();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addCartHandler = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (data && !error) {
      const food = {
        idFood: props.idFood?.toString() || '1',
        numberFood: parseInt(numberButtonRef.current?.value || '-1'),
        imageFood: props.imageFood || '',
        nameFood: props.nameFood || '',
        priceFood: props.priceFood || 0
      };
      // console.log(food);
      if (food.numberFood > 0) {
        cart.addFood(food);
      }
    }
  };

  return (
    <Flex
      flexDirection={'column'}
      marginLeft={'3rem'}
      alignItems={'flex-start'}
    >
      <Text fontSize={'2rem'} color={'richText.100'}>
        {props.nameFood}
      </Text>
      <TableContainer>
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={AiFillTags} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Loại thực phẩm:
                  </Text>
                </Flex>
              </Td>
              <Td>{props.nameCategory}</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={MdAttachMoney} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Giá bán
                  </Text>
                </Flex>
              </Td>
              <Td>{props.priceFood}₫</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>
                <Flex alignItems={'center'}>
                  <Icon as={IoTodaySharp} w={4} h={4} color={'main.800'} />
                  <Text isTruncated={true} textColor="main.800" ml={'0.2rem'}>
                    Ngày tạo
                  </Text>
                </Flex>
              </Td>
              <Td>{convertDateTime(props.timeCreate)}</Td>
            </Tr>
            <Tr>
              <Td padding={'0'}>Số lượng</Td>
              <Td>
                <ButtonNumber ref={numberButtonRef} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <ButtonCustom
        textDisplay={'Thêm vào giỏ hàng'}
        borderRadius={'0'}
        onClick={!error ? addCartHandler : onOpen}
      />
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
};

export default FoodDetail;
