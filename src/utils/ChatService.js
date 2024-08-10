import Chat from "./Chat";
import StorageService from "./StorageService";
import UserService from "./UserService";
import { List } from 'immutable';

const STORAGE_KEY = 'chat-messages';

class ChatService{

    static getMessages = () => {
        return localStorage.getItem(STORAGE_KEY);
    };

    static subscribe = (callback) => {
        return StorageService.subscribe(callback)
    };

    static sendMessage = (message, existingMessages, onAction) => {
        const newMessage = new Chat(message, UserService.id, Chat.createId(), onAction);
        const updatedMessageList = List(existingMessages).push(newMessage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessageList.toJS()));
        StorageService.emit();
    };
}

export default ChatService;