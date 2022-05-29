import { Button, useDisclosure, Text } from '@chakra-ui/react';
import ModalCustom from '../Modal/ModalCustom';
import ChatBody from './ChatBody';
import { ChatContext } from './ChatContext';

interface ChatContainerProps {
  idRoom: number;
  user: string | undefined;
  idUser: number;
  idOrder: number;
}

const ChatContainer = (props: ChatContainerProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <ChatContext.Provider
      value={{ idRoom: props.idRoom, user: props.user, idUser: props.idUser }}
    >
      <Button size={'xs'} variant={'outline'} onClick={onOpen}>
        Nhắn tin
      </Button>

      <ModalCustom
        header={<Text color={'main.500'}>Khung chat đơn hàng {props.idOrder}</Text>}
        isOpen={isOpen}
        onClose={onClose}
        body={<ChatBody />}
      />
    </ChatContext.Provider>
  );
};

export default ChatContainer;
