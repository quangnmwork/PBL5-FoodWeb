import { ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react';

interface ButtonScrollToTopProps {
  isShowScrollToTop: boolean;
}

const ButtonScrollToTop = (props: ButtonScrollToTopProps) => {
    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  return (
    <IconButton
      icon={<ArrowUpIcon />}
      aria-label="scroll-to-top"
      fontSize="20px"
      position={'sticky'}
      bottom={'2rem'}
      left={'95vw'}
      display={props.isShowScrollToTop ? 'block' : 'none'}
      onClick={handleScroll}
    ></IconButton>
  );
};

export default ButtonScrollToTop;
