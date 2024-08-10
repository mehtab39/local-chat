import { useCallback, useMemo, useSyncExternalStore } from 'react';
import Chat from '../utils/Chat';
import ChatService from '../utils/ChatService';

export function useChat() {
    const stringifed = useSyncExternalStore(ChatService.subscribe, ChatService.getMessages);

    // LinkedList
    const messageList = useMemo(() => {
        return Chat.parseMessages(stringifed)
    }, [stringifed])

    const sendMessage = useCallback((text) => {
        ChatService.sendMessage(messageList, text)
    }, [messageList])

    const deleteMessage = (messageNode) => {
        return ChatService.deleteMessage(messageList, messageNode)
    }

    const hideMessage = (messageNode) => {
        return ChatService.hideMessage(messageList, messageNode)
    }

    const unhideMessage = (messageNode) => {
        return ChatService.unhideMessage(messageList, messageNode)
    }

    return [messageList.head, sendMessage, { deleteMessage, hideMessage, unhideMessage }];
}

