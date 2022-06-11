/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../api/repositoryFactory';
import CustomCard from '../Card/CustomCard';
import { User } from './../../models/User.model';
import SellerDetail from './SellerDetail';
import SellerFoods from './SellerFoods';

const SellerMain = () => {
  const [seller, setSeller] = useState<User>();
  const params = useParams();
  useEffect(() => {
    let mounted = true;
    if (params.id) {
      userAPI.getSellerById(parseInt(params.id)).then((res) => {
        if (mounted) setSeller(res.data);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <CustomCard>
        <Flex justifyContent={'center'} py={'1.5rem'}>
          <Box>
            <Image
              src={seller?.avatar}
              alt={seller?.avatar}
              width={'30rem'}
              height={'full'}
            />
          </Box>
          <SellerDetail
            nameUser={seller?.nameUser}
            phone={seller?.phone}
            address={seller?.address}
          />
        </Flex>
      </CustomCard>
      <CustomCard my={'2rem'} width={'45%'} mx={'auto'}>
        <SellerFoods idUser={params.id} />
      </CustomCard>
    </>
  );
};

export default SellerMain;
