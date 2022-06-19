/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  MutableRefObject
} from 'react';
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
  LogLevel
} from '@microsoft/signalr';
import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { ChatContext } from './ChatContext';

import ChatMessageContainer from './ChatMessageContainer';
import { FiSend } from 'react-icons/fi';
import useSWR from 'swr';

const ChatBody = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const messageRef = createRef<HTMLInputElement>();
  const [messageValue, setMessageValue] = useState<string>('');
  const bodyMessage =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const [loading, setLoading] = useState<boolean>();
  const { idRoom, user } = useContext(ChatContext);
  const { data, mutate } = useSWR(`RoomDetail/${idRoom}`);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_DOMAIN_PROD}/chat`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      console.log('Join group');
      connection.invoke('JoinGroup', idRoom).catch(function (err) {
        return console.error(err.toString());
      });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Reiceive');
          connection.on(
            'ReceiveGroupMessage',
            function (user: any, message: any, group: any) {
              mutate();
            }
          );
          if (bodyMessage.current) {
            bodyMessage.current.scrollIntoView({ behavior: 'smooth' });
          }
        })
        .catch((error: any) => console.log(error));
    }
  }, [connection]);

  const onSendMessage = async () => {
    if (connection) {
      try {
        setLoading(true);
        if (messageValue.length > 0) {
          await connection.invoke(
            'SendMessageToGroup',
            idRoom,
            user,
            messageValue
          );
        }
        if (bodyMessage.current) {
          bodyMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (e) {
        if (bodyMessage.current) {
          bodyMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(e);
      } finally {
        setMessageValue('');
        mutate();
        setLoading(false);
      }
    } else {
      console.log('No connection to server yet.');
    }
  };
  const handleKeyDownSendMessage = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == 'Enter') {
      onSendMessage();
    }
  };
  return (
    <Box>
      <ChatMessageContainer ref={bodyMessage} data={data} />
      <Flex mt={'1rem'} gap={'.5rem'}>
        <Input
          ref={messageRef}
          value={messageValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMessageValue(e.target.value);
          }}
          onKeyDown={handleKeyDownSendMessage}
        />
        <IconButton
          aria-label="send-message"
          onClick={onSendMessage}
          isLoading={loading}
          icon={<FiSend />}
        />
      </Flex>
    </Box>
  );
};

export default ChatBody;
