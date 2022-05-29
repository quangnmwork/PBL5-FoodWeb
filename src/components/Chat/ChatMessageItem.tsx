import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { timeSince } from '../../utils/convertDateTime';
import { ChatContext } from './ChatContext';

interface ChatMessageItemProps {
  message: string;
  chatIdUser: number;
  time: string;
}

const ChatMessageItem = (props: ChatMessageItemProps) => {
  const { idUser } = useContext(ChatContext);
  const isUser = () => {
    return props.chatIdUser == idUser;
  };

  return (
    <Flex justifyContent={isUser() ? 'flex-end' : 'flex-start'}>
      <Flex flexDirection={'column'} maxWidth={'50%'}>
        <Box
          backgroundColor={isUser() ? 'gray.100' : 'main.100'}
          my={'.2rem'}
          borderRadius={'lg'}
          px={'1rem'}
          py={'.5rem'}
        >
          {props.message}
        </Box>
        <Text
          fontSize={'.8rem'}
          alignSelf={isUser() ? 'flex-end' : 'flex-start'}
        >
          {timeSince(new Date(props.time))}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChatMessageItem;
