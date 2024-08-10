
import LinkedList from './DS/LinkedList';
import user from './UserService';

class Chat{


    static CreateMessage(text, authorId){
        return {
            text: text || '',
            authorId: authorId || '',
            chatId: Math.random().toString(36).substr(2, 9),
            isHidden: false
        }
    }

    constructor(msg = Chat.CreateMessage()){
        this.text = msg.text;
        this.authorId = msg.authorId;
        this.chatId = msg.chatId;
        this.isHidden = msg.isHidden;
    }

    hide(){
        this.isHidden = true;
    }

    unhide(){
        this.isHidden = false;
    }

    static Instance(msg){
        return new Chat(msg);
    }

    static parseMessages(stringifed){
        return LinkedList.fromString(stringifed, Chat.Instance);
    }

    get id(){
        return this.chatId;
    }

    get isSelfUserAuthor(){
        return this.authorId === user.id;
    }
}


export default Chat;