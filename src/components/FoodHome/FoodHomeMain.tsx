import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import useFoodFetch from '../../hooks/foods/useFoodFetch';
import FoodHomeItem from './FoodHomeItem';

interface FoodHomeMainProps {
  activeCategory: string;
}

const FoodHomeMain = (props: FoodHomeMainProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const containerRef = createRef<HTMLDivElement>();
  const { foods, loading, hasMore } = useFoodFetch(
    props.activeCategory,
    '',
    pageNumber
  );
  const observer = useRef<null | IntersectionObserver>(null);
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
    [loading, hasMore]
  );
  useEffect(() => {
    if (pageNumber > 1) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.activeCategory]);
  return (
    <Flex flexDirection={'column'} alignItems={'center'} flexBasis={'90%'}>
      <SimpleGrid ml={'2rem'} columns={5} spacing={'1rem'} ref={containerRef}>
        {foods.map((food, index) => {
          if (foods.length === index + 1) {
            return (
              <FoodHomeItem ref={lastFoodElementRef} food={food} key={index} />
            );
          } else {
            return <FoodHomeItem food={food} key={index} />;
          }
        })}
        {/* <div>{error && 'Error'}</div> */}
      </SimpleGrid>
      <Flex justifyContent={'center'} width={'100%'} mt={'2rem'}>
        {loading && (
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
