import { Box, Image, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User.model';
import CustomCard from '../Card/CustomCard';
interface SellerSearchtemProps {
  seller: User;
}

const SellerSearchItem = React.forwardRef<any, SellerSearchtemProps>(
  (props, ref) => {
    const navigate = useNavigate();
    return (
      <CustomCard
        data-id={props.seller.idUser}
        role={'group'}
        title={`${props.seller.nameUser},${props.seller.address}`}
        onClick={() => {
          navigate(`/seller/${props.seller.idUser}`);
        }}
      >
        <Flex flexDirection={'column'} ref={ref}>
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

          <Box px={'.5rem'} py={'.7rem'}>
            <Text isTruncated={true}>{props.seller.nameUser}</Text>
            <Text isTruncated={true}>{props.seller.address}</Text>
          </Box>
        </Flex>
      </CustomCard>
    );
  }
);
SellerSearchItem.displayName = 'SellerSearchItem';

export default SellerSearchItem;
