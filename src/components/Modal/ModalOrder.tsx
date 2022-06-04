import { Flex, Avatar, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { ReiceiveOrderDetailItem } from '../../models/Order.model';
import CustomCard from '../Card/CustomCard';

interface ModalOrderProps {
  food: ReiceiveOrderDetailItem;
}
const ModalOrder = (props: ModalOrderProps) => {
  const { food } = props;

  const navigate = useNavigate();
  return (
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
          <Text fontWeight={'semibold'}>
            <Text as={'span'} color={'main.600'} fontWeight={'bold'}>
              Số lượng
            </Text>{' '}
            : {food.numberFood}
          </Text>
          <Text fontWeight={'semibold'}>
            <Text as={'span'} color={'main.600'} fontWeight={'bold'}>
              Số tiền
            </Text>{' '}
            : {food.priceFood * food.numberFood}
          </Text>
        </Flex>
      </Flex>
    </CustomCard>
  );
};

export default ModalOrder;
