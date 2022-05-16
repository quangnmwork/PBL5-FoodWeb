import { Flex, Heading, Text } from '@chakra-ui/react';

const Hero = () => {
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
      >
        <Heading as={'h2'}>Welcom to Fooder</Heading>
        <Text>Đặt món ăn nhanh nhất với Fooder</Text>
      </Flex>
    </Flex>
  );
};

export default Hero;
