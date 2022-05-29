/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import useSWR from 'swr';
import axiosClient from '../../api/repository';
import { ChatContext } from './ChatContext';
import ChatMessageItem from './ChatMessageItem';

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const ChatMessageContainer = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { idRoom } = useContext(ChatContext);
    const { data } = useSWR(
      `${process.env.REACT_APP_DOMAIN}RoomDetail/${idRoom}`,
      fetcher,
      { refreshInterval: 100 }
    );

    return (
      <Box
        as={'div'}
        maxHeight={'20rem'}
        overflowY={'auto'}
        borderWidth={'1px'}
        borderColor={'moccasin.100'}
        p={'1rem'}
      >
        {data
          ? data.map((dataMessage: any, index: number) => (
              <ChatMessageItem
                key={index}
                message={dataMessage.message}
                chatIdUser={dataMessage.userId}
                time={dataMessage.timeChat}
              />
            ))
          : null}
        <div ref={ref}></div>
      </Box>
    );
  }
);
ChatMessageContainer.displayName = 'ChatMessageContainer';
export default ChatMessageContainer;
