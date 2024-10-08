import { useCallback, useEffect, useRef } from 'react';
import ChatService from '../utils/ChatService';
import useRender from './useRender';
import Chat from '../utils/Chat';

export function useChat() {
    const messageList = useRef(Chat.parseMessages(ChatService.getMessages()));

    const render = useRender();

    const onFirstMessage = useCallback(() => {
        render()
    }, [render])

    useEffect(() => {
        return ChatService.broadcastSubscribe(messageList.current, onFirstMessage);
    }, [onFirstMessage])


    useEffect(() => {

        const requestNotificationPermission = () => {
            if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    console.log('Notification permission:', permission);
                });
            }
        };

        requestNotificationPermission();

        const showNotification = (count) => {
            if(count <= 0) return;
            if (Notification.permission === 'granted') {
                new Notification('New Messages', {
                    body: `You have ${count} new messages.`,
                });
            }
        };

        return ChatService.notificationSubscribe(showNotification);
    }, []);


    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            ChatService.storeMessages(messageList.current)
        });
    }, [])
    const sendMessage = useCallback((text) => {
        ChatService.sendMessageV2(messageList.current, text, onFirstMessage)
    }, [onFirstMessage])

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

