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

    const deleteMessage = (msg) => {
        return ChatService.deleteMessage(messageList, msg)
    }

    const hideMessage = (msg) => {
        return ChatService.hideMessage(messageList, msg)
    }

    const unhideMessage = (msg) => {
        return ChatService.unhideMessage(messageList, msg)
    }

    return [messageList.head, sendMessage, { deleteMessage, hideMessage, unhideMessage }];
}

