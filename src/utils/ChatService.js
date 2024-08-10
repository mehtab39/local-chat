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

    static sendMessage = (messageList, messageText) => {
        const chatMessage = Chat.CreateMessage(messageText, UserService.id);
        const newMessage = new Chat(chatMessage);
        localStorage.setItem(STORAGE_KEY, messageList.append(newMessage).toStringified());
        StorageService.emit();
    };

    static deleteMessage = (messageList, msg) => {
        localStorage.setItem(STORAGE_KEY, messageList.deleteById(msg.id).toStringified());
        StorageService.emit();
    }

    static hideMessage = (messageList, msg) => {
        msg.hide();
        localStorage.setItem(STORAGE_KEY, messageList.toStringified());
        StorageService.emit();
    }

    static unhideMessage = (messageList, msg) => {
        msg.unhide();
        localStorage.setItem(STORAGE_KEY, messageList.toStringified());
        StorageService.emit();
    }
}

export default ChatService;