import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';
import { Seller } from '../../models/User.model';
import SellerPagnitationItem from './SellerPagnitationItem';

interface SellerPagnitationProps {
  numberPage: number;
}

const SellerPagnitation = (props: SellerPagnitationProps) => {
  const [seller, setSeller] = useState<Seller[]>([]);
  useEffect(() => {
    const fetchSeller = async () => {
      return userAPI.getSellers(props.numberPage);
    };
    let mounted = true;
    fetchSeller().then((res) => {
      if (mounted) {
        setSeller(res.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Box>
      {seller.map((sellerUser) => (
        <SellerPagnitationItem key={sellerUser.idUser} seller={sellerUser} />
      ))}
    </Box>
  );
};

export default SellerPagnitation;
