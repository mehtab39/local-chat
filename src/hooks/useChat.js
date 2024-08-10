import { useCallback, useEffect, useRef } from 'react';
import ChatService from '../utils/ChatService';
import useRender from './useRender';
import LinkedList from '../utils/DS/LinkedList';

export function useChat() {
    const messageList = useRef(new LinkedList());
    const render = useRender();

    function onFirstMessage() {
        render()
    }

    useEffect(() => {
        return ChatService.broadcastSubscribe(messageList.current, onFirstMessage);
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

