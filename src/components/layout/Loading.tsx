import { Flex, Text } from '@chakra-ui/react';
import './Loading.css';

const Loading = () => {
  return (
    <Flex
      height={'100vh'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      mx={'auto'}
      flexDir={'column'}
    >
      <div className="bounce">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Text fontWeight={'bold'} color={'main.600'}>
        Vui lòng chờ...
      </Text>
    </Flex>
  );
};

export default Loading;
