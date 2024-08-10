import { useCallback, useMemo, useSyncExternalStore } from 'react';
import Chat from '../utils/Chat';
import ChatService from '../utils/ChatService';

export function useChat() {
    const stringifed = useSyncExternalStore(ChatService.subscribe, ChatService.getMessages);

    const messages = useMemo(() => {
        return Chat.parseMessages(stringifed)
    }, [stringifed])

    const sendMessage = useCallback((text) => {
        ChatService.sendMessage(text, messages)
    }, [messages])

    const deleteMessage = (messageNode) => {
        return ChatService.deleteMessage(messages, messageNode)
    }

    return [messages.head, sendMessage, { deleteMessage }];
}

