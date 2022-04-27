import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { orderAPI } from '../../api/repositoryFactory';
import CustomCard from '../Card/CustomCard';

interface HistoryOrderModalProps {
  orderDetailId: number;
}
interface ReiceiveOrderDetailItem {
  idFood: number;
  nameFood: string;
  numberFood: number;
  imageFood?: string;
}
const HistoryOrderModal = (props: HistoryOrderModalProps) => {
  const [foodsDetail, setFoodsDetail] = useState<ReiceiveOrderDetailItem[]>([]);
  useEffect(() => {
    let mounted = true;
    orderAPI.getAllFoodByOrderId(props.orderDetailId).then((res) => {
      if (mounted) setFoodsDetail(res.data);
    });
    return () => {
      mounted = false;
    };
  }, []);
  console.log(foodsDetail);
  return (
    <Box>
      {foodsDetail.map((food) => (
        <CustomCard key={food.idFood} px={'1rem'} py={'.5rem'}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              <Avatar src={food.imageFood || '/assets/no-image.png'} />
              <Text ml={'.5rem'} fontWeight={'semibold'}>
                {food.nameFood}
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight={'semibold'}>Số lượng : {food.numberFood}</Text>
            </Flex>
          </Flex>
        </CustomCard>
      ))}
    </Box>
  );
};

export default HistoryOrderModal;
