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

    static sendMessage = (messageList, message) => {
        const chatMessage = Chat.CreateMessage(message, UserService.id);
        const newMessage = new Chat(chatMessage);
        localStorage.setItem(STORAGE_KEY, messageList.append(newMessage).toStringified());
        StorageService.emit();
    };

    static deleteMessage = (messageList, messageNode) => {
        localStorage.setItem(STORAGE_KEY, messageList.delete(messageNode).toStringified());
        StorageService.emit();
    }

    static hideMessage = (messageList, messageNode) => {
        messageNode.value.hide();
        localStorage.setItem(STORAGE_KEY, messageList.toStringified());
        StorageService.emit();
    }
}

export default ChatService;