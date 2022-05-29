import { createContext } from 'react';

interface ChatContextProps {
  idRoom: number;
  user: string | undefined;
  idUser: number;
}
export const ChatContext = createContext<ChatContextProps>({
  idRoom: 1,
  user: '',
  idUser: 1
});
