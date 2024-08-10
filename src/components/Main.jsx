import { useChat } from '../hooks/useChat';
import ChatList from './ChatList';
import Input from './Input';
import { ChakraProvider } from '@chakra-ui/react'

const Main = () => {
  const [messages, sendMessage, actions] = useChat();
  return (
    <ChakraProvider>
      <ChatList messages={messages} actions={actions}/>
      <Input sendMessage={sendMessage} />
    </ChakraProvider>
  );
};

export default Main;
