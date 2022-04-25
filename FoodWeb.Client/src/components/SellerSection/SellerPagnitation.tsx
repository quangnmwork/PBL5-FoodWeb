import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';
import { Seller } from '../../models/User.model';
import SellerPagnitationItem from './SellerPagnitationItem';

interface SellerPagnitationProps {
  numberPage: number;
}
const fakeArray = new Array(10).fill(1).map((_, index) => ({
  avatar: '/assets/user-avatar.jpg',
  nameUser: `Seller ${index}`,
  address: `${index}`,
  idUser: `${index}`,
  phone: '123'
}));

const SellerPagnitation = (props: SellerPagnitationProps) => {
  const [seller, setSeller] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeller = async () => {
      return userAPI.getSellers(props.numberPage);
    };
    let mounted = true;
    setIsLoading(true);
    fetchSeller().then((res) => {
      if (mounted) {
        setSeller(res.data);
        setIsLoading(false);
      }
    });
    return () => {
      setIsLoading(false);
      mounted = false;
    };
  }, [props.numberPage]);
  return (
    <>
      <SimpleGrid columns={5} spacing={'1.5rem'}>
        {seller.length
          ? seller.map((sellerUser) => (
              <SellerPagnitationItem
                key={sellerUser.idUser}
                seller={sellerUser}
                isLoading={isLoading}
              />
            ))
          : fakeArray.map((sellerUser) => (
              <SellerPagnitationItem
                key={sellerUser.idUser}
                seller={sellerUser}
                isLoading={isLoading}
              />
            ))}
      </SimpleGrid>
    </>
  );
};

export default SellerPagnitation;
