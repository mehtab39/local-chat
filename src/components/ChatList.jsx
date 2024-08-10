import { Box } from "@chakra-ui/react";
import Chat from "./Chat";
import useRender from "../hooks/useRender";

const ChatList = ({ messageNode, actions, listRender }) => {
    if (!messageNode) return null;
    const msg = messageNode.value;
    return (
        <Box>
            <Chat listRender={listRender} key={messageNode.value.id} msg={msg} actions={actions} />
            <ChatList messageNode={messageNode.next} actions={actions} listRender={listRender}/>
        </Box>
    )
}


const WrappedChatList = (props) => {
    const listRender = useRender();
    return <ChatList {...props} listRender={listRender} />
}
export default WrappedChatList;
