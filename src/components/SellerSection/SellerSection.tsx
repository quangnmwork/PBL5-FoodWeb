import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { userAPI } from '../../api/repositoryFactory';
import Logo from '../Logo/Logo';
import SellerPagnitation from './SellerPagnitation';

const SellerSection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  useEffect(() => {
    const fetchTotalSellerPages = async () => {
      return userAPI.getTotalPageSellers();
    };
    let mounted = true;
    fetchTotalSellerPages().then((res) => {
      if (mounted) {
        setTotalPage(res.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  const slideHandler = (isNext: boolean) => {
    if (isNext) {
      if (currentPage == totalPage) {
        setCurrentPage(1);
      }
      setCurrentPage((prevNumber) => prevNumber + 1);
    } else {
      if (currentPage <= 1) {
        setCurrentPage(totalPage);
      }
      setCurrentPage((prevNumber) => prevNumber - 1);
    }
  };

  return (
    <Box border={'1px solid'} borderColor={'borderColor.100'}>
      <Flex bgColor={'white'} alignItems={'center'} px={'1rem'} py={'.5rem'}>
        <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
        <Text as="p" fontWeight={'bold'} fontSize={'xl'}>
          Gợi ý cho bạn
        </Text>
      </Flex>
      <Box px={'3rem'} py={'1rem'} position={'relative'}>
        <SellerPagnitation numberPage={currentPage} />
        <IconButton
          icon={<ChevronLeftIcon />}
          position={'absolute'}
          aria-label="Left Icon"
          top={'50%'}
          left={'0'}
          variant={'outline'}
          fontSize={'1.2rem'}
          isDisabled={totalPage == 0}
          onClick={() => {
            slideHandler(false);
          }}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          position={'absolute'}
          aria-label="Right Icon"
          top={'50%'}
          right={'0'}
          variant={'outline'}
          fontSize={'1.2rem'}
          isDisabled={totalPage == 0}
          onClick={() => {
            slideHandler(true);
          }}
        />
      </Box>
    </Box>
  );
};

export default SellerSection;
