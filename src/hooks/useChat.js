import { useCallback, useEffect, useRef } from 'react';
import ChatService from '../utils/ChatService';
import useRender from './useRender';
import Chat from '../utils/Chat';

export function useChat() {
    const messageList = useRef(Chat.parseMessages(ChatService.getMessages()));

    const render = useRender();

    function onFirstMessage() {
        render()
    }

    useEffect(() => {
        return ChatService.broadcastSubscribe(messageList.current, onFirstMessage);
    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            ChatService.storeMessages(messageList.current)
        });
    }, [])
    const sendMessage = useCallback((text) => {
        ChatService.sendMessageV2(messageList.current, text, onFirstMessage)
    }, [])

    const deleteMessage = (msg) => {
        return ChatService.deleteMessageV2(messageList.current, msg)
    }

    const hideMessage = (msg) => {
        return ChatService.hideMessageV2(messageList.current, msg)
    }

    const unhideMessage = (msg) => {
        return ChatService.unhideMessageV2(messageList.current, msg)
    }

    return [messageList.current.head, sendMessage, { deleteMessage, hideMessage, unhideMessage }];
}

