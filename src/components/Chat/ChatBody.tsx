import {
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

const ChatBody = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const messageRef = createRef<HTMLInputElement>();
  const bodyMessage =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const [loading, setLoading] = useState<boolean>();
  const { idRoom, user } = useContext(ChatContext);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chat', {
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
              console.log('Reiceve event', user, group, message);
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
        await connection.invoke(
          'SendMessageToGroup',
          idRoom,
          user,
          messageRef.current?.value
        );
        if (bodyMessage.current) {
          bodyMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (e) {
        if (bodyMessage.current) {
          bodyMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No connection to server yet.');
    }
  };
  return (
    <Box>
      <ChatMessageContainer ref={bodyMessage} />
      <Flex mt={'1rem'} gap={'.5rem'}>
        <Input ref={messageRef} />
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
