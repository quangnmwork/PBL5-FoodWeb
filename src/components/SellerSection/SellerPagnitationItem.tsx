import { Box } from '@chakra-ui/react';
import { Seller } from '../../models/User.model';

interface SellerPagnitationItemProps {
  seller: Seller;
}

const SellerPagnitationItem = (props: SellerPagnitationItemProps) => {
  return <Box>{props.seller.nameUser}</Box>;
};

export default SellerPagnitationItem;
