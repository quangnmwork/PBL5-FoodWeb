import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import SellerPagnitation from './SellerPagnitation';

const SellerSection = () => {
  return (
    <Box border={'1px solid black'}>
      <Flex bgColor={'white'} alignItems={'center'} px={'1rem'}>
        <Logo width={['3rem', '4rem']} height={['3rem', '4rem']} />
        <Text as="p" fontWeight={'bold'} fontSize={'xl'}>
          Gợi ý cho bạn
        </Text>
      </Flex>
      <Box p={'2rem'} position={'relative'}>
        <SellerPagnitation numberPage={1} />
        <IconButton
          icon={<ChevronLeftIcon />}
          position={'absolute'}
          aria-label="Left Icon"
          top={'50%'}
          left={'0'}
          variant={'outline'}
          fontSize={'1.2rem'}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          position={'absolute'}
          aria-label="Right Icon"
          top={'50%'}
          right={'0'}
          variant={'outline'}
          fontSize={'1.2rem'}
        />
      </Box>
    </Box>
  );
};

export default SellerSection;
