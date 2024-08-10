import Chat from "./Chat";
import StorageService from "./StorageService";
import UserService from "./UserService";

const STORAGE_KEY = 'chat-messages';

class ChatService{
    static getMessages = () => {
        return localStorage.getItem(STORAGE_KEY);
    };

    static subscribe = (callback) => {
        return StorageService.subscribe(callback)
    };

    static sendMessage = (message, messageList, onAction) => {
        const newMessage = new Chat(message, UserService.id, Chat.createId(), onAction);
        localStorage.setItem(STORAGE_KEY, messageList.append(newMessage).toStringified());
        StorageService.emit();
    };

    static deleteMessage = (messageList, messageNode) => {
        localStorage.setItem(STORAGE_KEY, messageList.delete(messageNode).toStringified());
        StorageService.emit();
    }
}

export default ChatService;