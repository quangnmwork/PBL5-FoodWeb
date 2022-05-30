import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Order } from '../../models/Order.model';
import { HistoryContext } from './HistoryContext';
import HistoryOrderPagnitation from './HistoryOrderPagnitation';

const HistoryOrderMain = () => {
  const [currentSelect, setCurrentSelect] = useState<string>('not-ship');
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSelect(event.target.value);
  };
  const [order, setOrder] = useState<Order[]>([]);

  return (
    <HistoryContext.Provider
      value={{ order: order, type: 'not-ship', setOrder: setOrder }}
    >
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
            <option value={'not-ship'}>Chưa nhận giao hàng</option>
            <option value={'shipping'}>Đang giao hàng</option>
            <option value={'ship'}>Đã giao hàng</option>
          </Select>
        </Flex>
        <HistoryOrderPagnitation isShipped={currentSelect} />
      </Flex>
    </HistoryContext.Provider>
  );
};

export default HistoryOrderMain;
