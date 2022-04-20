import { Box } from '@chakra-ui/react';
import React from 'react';

const HeroSlide = () => {
  return (
    <Box
      backgroundImage={'url(/assets/hero-1.svg)'}
      bgRepeat={'no-repeat'}
      bgPosition={'center'}
      width={'100%'}
      minHeight={'100%'}
      bgSize={'cover'}
    ></Box>
  );
};

export default HeroSlide;
