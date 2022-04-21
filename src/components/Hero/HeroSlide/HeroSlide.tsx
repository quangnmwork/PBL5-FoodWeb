import { Box, Image, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const HeroSlide = () => {
  return (
    <Flex>
      <Box flexBasis={'50%'}>
        <Image src={'/assets/hero-1.svg'} objectFit={'cover'} height={'60vh'} />
      </Box>
      <Box>
        <Heading as={'h2'}>Thoải mái chọn lựa</Heading>
      </Box>
    </Flex>
  );
};

export default HeroSlide;
