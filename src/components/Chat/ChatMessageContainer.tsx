import { Box } from '@chakra-ui/react';
import React from 'react';

import ChatMessageItem from './ChatMessageItem';
interface ChatMessageContainerProps {
  data: any;
}

const ChatMessageContainer = React.forwardRef<
  HTMLDivElement,
  ChatMessageContainerProps
>((props, ref) => {
  return (
    <Box
      as={'div'}
      height={'20rem'}
      overflowY={'auto'}
      borderWidth={'1px'}
      borderColor={'moccasin.100'}
      p={'1rem'}
    >
      {props.data
        ? props.data.map((dataMessage: any, index: number) => (
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
});
ChatMessageContainer.displayName = 'ChatMessageContainer';
export default ChatMessageContainer;
