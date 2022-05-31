import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import useSeller from '../../hooks/foods/useSeller';

import SellerSearchItem from './SellerSearchItem';

interface SellerSearchMainProps {
  keyName?: string;
}

const SellerSearchMain = (props: SellerSearchMainProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { sellers, loading, hasMore, error } = useSeller(
    props.keyName || '',
    pageNumber
  );

  const observer = useRef<null | IntersectionObserver>(null);
  useEffect(() => {
    return () => {
      setPageNumber(1);
    };
  }, [pageNumber]);

  const lastFoodElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, props.keyName]
  );

  // console.log('Eror', error);

  return (
    <>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        flexBasis={'90%'}
        position={'sticky'}
        top={'5rem'}
      >
        <SimpleGrid ml={'2rem'} columns={5} spacing={'1rem'}>
          {!error && sellers.length
            ? sellers.map((seller, index) => {
                if (sellers.length === index + 1) {
                  return (
                    <SellerSearchItem
                      ref={lastFoodElementRef}
                      seller={seller}
                      key={index}
                    />
                  );
                } else {
                  return <SellerSearchItem seller={seller} key={index} />;
                }
              })
            : null}
        </SimpleGrid>

        <Flex justifyContent={'center'} width={'100%'} mt={'2rem'}>
          {loading ? (
            <Spinner
              color={'main.200'}
              thickness="5px"
              speed={'0.65s'}
              size={'md'}
            />
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default SellerSearchMain;
