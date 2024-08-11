
import { fromJS } from 'immutable';
import LinkedList from './DS/LinkedList';
import user from './UserService';


class Chat{
    static CreateMessage(text){
        return {
            text: text || '',
            authorId: user.id,
            chatId: Math.random().toString(36).substr(2, 9),
            isHidden: false
        }
    }

    constructor(msg = Chat.CreateMessage()){
        this.text = msg.text;
        this.authorId = msg.authorId;
        this.chatId = msg.chatId;
        this.isHidden = msg.isHidden;
        this.onChangeCallback = null;
    }

    toJSON() {
         return {
             text: this.text,
             chatId: this.chatId,
             authorId: this.authorId,
             isHidden: this.isHidden
         }
    }

    hide(){
        this.isHidden = true;
    }

    unhide(){
        this.isHidden = false;
    }

    registerOnChange(callback){
        this.onChangeCallback = callback;
    }

    unregisterOnChange() {
        this.onChangeCallback = null;
    }


    static Instance(msg){
        return fromJS(new Chat(msg));
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