import {
  Flex,
  Image,
  Box,
  Text,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Seller } from '../../models/User.model';
import CustomCard from '../Card/CustomCard';

interface SellerPagnitationItemProps {
  seller: Seller;
  isLoading: boolean;
}

const SellerPagnitationItem = (props: SellerPagnitationItemProps) => {
  const navigate = useNavigate();
  return (
    <CustomCard
      data-id={props.seller.idUser}
      cursor={'pointer'}
      role={'group'}
      title={`${props.seller.nameUser},${props.seller.address}`}
      onClick={() => {
        navigate(`/seller/${props.seller.idUser}`, { replace: true });
      }}
    >
      <Flex flexDirection={'column'}>
        <Skeleton isLoaded={!props.isLoading}>
          <Box overflow={'hidden'}>
            <Image
              src={props.seller.avatar}
              alt={props.seller.avatar}
              boxSize={'8rem'}
              width={'100%'}
              transition={'all .2s ease-in'}
              _groupHover={{ transform: 'scale(1.1)' }}
              height={'9rem'}
            />
          </Box>
        </Skeleton>
        <Box px={'.5rem'} py={'.7rem'}>
          <SkeletonText isLoaded={!props.isLoading}>
            <Text isTruncated={true}>{props.seller.nameUser}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={!props.isLoading}>
            <Text isTruncated={true}>{props.seller.address}</Text>
          </SkeletonText>
        </Box>
      </Flex>
    </CustomCard>
  );
};

export default SellerPagnitationItem;
