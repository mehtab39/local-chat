import { fromEvent, map, merge, scan, startWith, filter } from "rxjs";
import BroadcastService from "./BroadcastService";
import Chat from "./Chat";
import user from "./UserService";

const broadcastService = new BroadcastService('ChatService', user.id)
class ChatService{

    static getMessages(){
        return localStorage.getItem('chat-messages');
    }

    static storeMessages(messageList){
        localStorage.setItem('chat-messages', messageList.toStringified());
    }
    static broadcastSubscribe(messageList, onFirstMessage){
        const onChange = ({type, data}) => {
            let priority = 0;
            if (type === 'NEW_MESSAGE'){
                const isFirstMessage = messageList.isEmpty();
                const newMessage = new Chat(data);
                messageList.append(newMessage);
                isFirstMessage ? onFirstMessage() : messageList.head.value.onChangeCallback(2)
                return;
            }
            const msg = messageList.getNodeValById(data.msgId);
            if (type === 'HIDE'){
                msg.hide();
                priority = 1;
            }else if(type === 'UNHIDE'){
                msg.unhide();
                priority = 1;
            } else if (type === 'DELETE'){
                messageList.deleteById(msg.id);
                priority = 2;
            }
            msg.onChangeCallback(priority);
        }
        const subscription = broadcastService.message$.subscribe(onChange);
     
        return () =>{
            subscription.unsubscribe();
           
        } 
    }


    static notificationSubscribe(onNotification) {
        const count$ = broadcastService.message$.pipe(
            scan(count => count + 1, 0)
        );

        const visibilityChange$ = fromEvent(document, 'visibilitychange').pipe(
            map(() => document.visibilityState === 'visible'),
            startWith(document.visibilityState === 'visible')
        );

        const combined$ = merge(count$, visibilityChange$.pipe(
            filter(visible => visible),
            scan(() => 0, 0)
        ));

        const subscription = combined$.subscribe(count => onNotification(count));

        return () => subscription.unsubscribe();
    }

    static sendMessageV2 = (messageList, messageText, onFirstMessage) => {
        const isFirstMessage = messageList.isEmpty();
        const chatMessage = Chat.CreateMessage(messageText);
        const newMessage = new Chat(chatMessage);
        messageList.append(newMessage);
        isFirstMessage ?  onFirstMessage() : messageList.head.value.onChangeCallback(2)
        broadcastService.broadcast('NEW_MESSAGE', chatMessage)
    };

    static hideMessageV2 = (_messageList, msg) => {
        msg.hide();
        msg.onChangeCallback(1);
        broadcastService.broadcast('HIDE', {msgId: msg.id})
    }

    static unhideMessageV2 = (_messageList, msg) => {
        msg.unhide();
        msg.onChangeCallback(1);
        broadcastService.broadcast('UNHIDE', { msgId: msg.id })
    }

    static deleteMessageV2 = (messageList, msg) => {
        messageList.deleteById(msg.id);
        msg.onChangeCallback(2);
        broadcastService.broadcast('DELETE', { msgId: msg.id })
    }
}

export default ChatService;