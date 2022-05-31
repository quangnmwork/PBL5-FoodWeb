import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  width?: string[];
  height?: string[];
  redirectLink?: string;
}

const Logo = (props: LogoProps) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(props.redirectLink || '/');
      }}
      cursor={'pointer'}
    >
      <Image
        src="/assets/logo.png"
        width={{ base: props.width?.[0], md: props.width?.[1] }}
        height={{ base: props.height?.[0], md: props.height?.[1] }}
      />
    </Box>
  );
};

export default Logo;
