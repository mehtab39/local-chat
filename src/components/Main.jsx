import { useChat } from '../hooks/useChat';
import ChatList from './ChatList';
import Input from './Input';
import { ChakraProvider } from '@chakra-ui/react'

const Main = () => {
  const [messageHead, sendMessage, actions] = useChat();
  return (
    <ChakraProvider>
      <ChatList messageNode={messageHead} actions={actions}/>
      <Input sendMessage={sendMessage} />
    </ChakraProvider>
  );
};

export default Main;
