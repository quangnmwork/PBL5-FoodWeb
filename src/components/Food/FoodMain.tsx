import { Box, Flex, Image, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Food } from '../../models/Food.model';
import CustomCard from '../Card/CustomCard';
import { foodAPI } from './../../api/repositoryFactory';
import FoodDetail from './FoodDetail';
import FoodDetailDescription from './FoodDetailDescription';

const FoodMain = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [food, setFood] = useState<Food>();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (params.id) {
      foodAPI
        .getFoodById(params.id)
        .then((res) => {
          if (mounted) setFood(res.data);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <CustomCard
        width={'50%'}
        mt={'2rem'}
        mx={'auto'}
        py={'1.5rem'}
        px={'.2rem'}
      >
        <Flex justifyContent={'center'}>
          <Box>
            <Skeleton isLoaded={!loading}>
              <Image
                src={food?.imageFood}
                alt={food?.nameFood}
                width={'25rem'}
                height={'full'}
              />
            </Skeleton>
          </Box>

          <FoodDetail food={food} loading={loading} />
        </Flex>
      </CustomCard>
      <CustomCard width={'50%'} mt={'2rem'} mx={'auto'} px={'.2rem'}>
        <FoodDetailDescription />
      </CustomCard>
    </>
  );
};

export default FoodMain;
