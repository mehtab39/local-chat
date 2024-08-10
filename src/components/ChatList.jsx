import Chat from "./Chat";

const ChatList = ({ messages, actions }) => {
    return messages.map((msg) => <Chat key={msg.id} msg={msg} actions={actions}/>)
}

export default ChatList;