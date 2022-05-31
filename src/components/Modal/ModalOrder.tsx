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
      cursor={'pointer'}
      _hover={{ boxShadow: 'lg' }}
      onClick={() => {
        navigate(`../seller/${food.sellerId}`);
      }}
    >
      <Flex my={'.5rem'}>
        <Avatar src={food.avatar || '/assets/no-image.png'} />
        <Text ml={'.5rem'} fontWeight={'semibold'} isTruncated={true}>
          {food.nameSeller}
        </Text>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Flex>
          <Avatar src={food.imageFood || '/assets/no-image.png'} />
          <Text ml={'.5rem'} fontWeight={'semibold'} isTruncated={true}>
            {food.nameFood}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight={'semibold'}>Số lượng : {food.numberFood}</Text>
        </Flex>
      </Flex>
    </CustomCard>
  );
};

export default ModalOrder;
