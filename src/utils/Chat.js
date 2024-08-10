
import LinkedList from './DS/LinkedList';
import user from './UserService';

class Chat{

    static createId =  () => Math.random().toString(36).substr(2, 9);

    constructor(text, authorId, chatId){
        this.text = text;
        this.authorId = authorId;
        this.chatId = chatId;
    }
    static toChat(msg){
        return new Chat(msg.text, msg.authorId, msg.chatId);
    }

    static parseMessages(stringifed){
        return LinkedList.fromString(stringifed, Chat.toChat);
    }

    get id(){
        return this.chatId;
    }

    get isSelfUserAuthor(){
        return this.authorId === user.id;
    }
}


export default Chat;