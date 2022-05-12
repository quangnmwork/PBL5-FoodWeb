import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import HistoryOrderPagnitation from './HistoryOrderPagnitation';

const HistoryOrderMain = () => {
  const [currentSelect, setCurrentSelect] = useState<string>('false');
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSelect(event.target.value);
  };
  console.log(currentSelect);
  return (
    <Flex
      maxWidth={{ base: '95%', md: '80%', lg: '70%' }}
      mx={'auto'}
      alignItems={'flex-end'}
      flexDirection={'column'}
      justifyContent={'center'}
      px={'3rem'}
      py={'1rem'}
      borderWidth={'1px'}
      borderColor={'moccasin.100'}
      boxShadow={'lg'}
    >
      <Flex
        width={'40%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text fontWeight={'bold'} color={'main.600'} display={'inline-block'}>
          Trạng thái
        </Text>
        <Select onChange={selectOnChange} width={'55%'}>
          <option value={'false'}>Chưa giao hàng</option>
          <option value={'true'}>Đã giao hàng</option>
        </Select>
      </Flex>
      <HistoryOrderPagnitation isShipped={currentSelect} />
    </Flex>
  );
};

export default HistoryOrderMain;
