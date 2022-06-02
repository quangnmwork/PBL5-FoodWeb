import { Flex, Avatar, Text, Skeleton } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import useFoodId from '../../hooks/foods/useFoodId';

import { ReiceiveOrderDetailItem } from '../../models/Order.model';
import CustomCard from '../Card/CustomCard';

interface ModalOrderProps {
  food: ReiceiveOrderDetailItem;
}
const ModalOrder = (props: ModalOrderProps) => {
  const { food } = props;
  const { foodById, loading } = useFoodId(props.food.idFood);

  const navigate = useNavigate();
  return (
    <Skeleton isLoaded={!loading}>
      <CustomCard
        key={food.idFood}
        px={'1rem'}
        py={'.5rem'}
        my={'.8rem'}
        border={'1px'}
        borderColor={'mocassin.50'}
        cursor={'pointer'}
        _hover={{ boxShadow: 'lg' }}
        onClick={() => {
          navigate(`../seller/${food.sellerId}`);
        }}
      >
        <Flex my={'.5rem'} alignItems={'center'} justifyContent={'center'}>
          <Text color={'main.600'} fontSize={'lg'} fontWeight={'semibold'}>
            Tên quán
          </Text>

          <Text ml={'.5rem'} fontWeight={'semibold'} isTruncated={true}>
            {food.nameSeller}
          </Text>
        </Flex>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex alignItems={'center'}>
            <Avatar src={food.imageFood || '/assets/no-image.png'} />
            <Text ml={'.5rem'} fontWeight={'semibold'} isTruncated={true}>
              {food.nameFood}
            </Text>
          </Flex>

          <Flex flexDirection={'column'}>
            <Text fontWeight={'semibold'}>Số lượng : {food.numberFood}</Text>{' '}
            <Text fontWeight={'semibold'}>Giá bán : {foodById?.priceFood}</Text>
          </Flex>
        </Flex>
      </CustomCard>
    </Skeleton>
  );
};

export default ModalOrder;
