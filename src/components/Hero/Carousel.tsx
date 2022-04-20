import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import HeroSlide from './HeroSlide/HeroSlide';
interface Slider {
  component: () => JSX.Element;
}
// const SliderComponents: Slider[] = { component: HeroSlide };
const Carousel = () => {
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  return (
    <Box
      position={'relative'}
      height={'60vh'}
      width={'full'}
      overflow={'hidden'}
    >
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Box
        height={'60vh'}
        position="relative"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <HeroSlide />
      </Box>
    </Box>
  );
};

export default Carousel;
