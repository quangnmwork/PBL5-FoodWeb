import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import useFoodFetch from '../../hooks/foods/useFoodFetch';
import FoodHomeItem from './FoodHomeItem';

interface FoodHomeMainProps {
  activeCategory: string;
  keyName?: string;
}

const FoodHomeMain = (props: FoodHomeMainProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const containerRef = createRef<HTMLDivElement>();
  const { foods, loading, hasMore, error } = useFoodFetch(
    props.activeCategory,
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
  useEffect(() => {
    if (pageNumber > 1) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.activeCategory, props.keyName]);
  // console.log('Eror', error);

  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      flexBasis={'90%'}
      ref={containerRef}
      position={'sticky'}
      top={'5rem'}
    >
      <SimpleGrid ml={'2rem'} columns={5} spacing={'1rem'}>
        {!error && foods.length
          ? foods.map((food, index) => {
              if (foods.length === index + 1) {
                return (
                  <FoodHomeItem
                    ref={lastFoodElementRef}
                    food={food}
                    key={index}
                  />
                );
              } else {
                return <FoodHomeItem food={food} key={index} />;
              }
            })
          : null}
      </SimpleGrid>
      <Flex justifyContent={'center'} width={'100%'} mt={'2rem'}>
        {loading || (
          <Spinner
            color={'main.200'}
            thickness="5px"
            speed={'0.65s'}
            size={'md'}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default FoodHomeMain;
