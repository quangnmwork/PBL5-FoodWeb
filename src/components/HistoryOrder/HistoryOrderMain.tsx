import { Flex, Select } from '@chakra-ui/react';
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
    >
      <Select width={'20%'} onChange={selectOnChange}>
        <option value={'false'}>Chưa ship</option>
        <option value={'true'}>Đã ship</option>
      </Select>
      <HistoryOrderPagnitation isShipped={currentSelect} />
    </Flex>
  );
};

export default HistoryOrderMain;
