import { Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
const Carousel = () => {
  return (
    <Flex
      bgImage={'/assets/hero.jpg'}
      height={'70vh'}
      bgPosition={'center'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex
        flexDirection={'column'}
        fontFamily={'monospace'}
        fontSize={'3xl'}
        alignItems={'center'}
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: '1' }}
      >
        <Heading as={'h2'}>Welcom to Fooder</Heading>
        <Text>Đặt món ăn nhanh nhất với Fooder</Text>
      </Flex>
    </Flex>
  );
};

export default Carousel;
