import { Box, Image } from '@chakra-ui/react';
import React from 'react';

interface LogoProps {
  width?: string[];
  height?: string[];
}

const Logo = (props: LogoProps) => {
  return (
    <Box>
      <Image
        src="/assets/logo.png"
        width={{ base: props.width?.[0], md: props.width?.[1] }}
        height={{ base: props.height?.[0], md: props.height?.[1] }}
      />
    </Box>
  );
};

export default Logo;
