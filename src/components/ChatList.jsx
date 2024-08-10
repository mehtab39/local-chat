import { Box } from "@chakra-ui/react";
import Chat from "./Chat";

const ChatList = ({ messageNode, actions }) => {
    if (!messageNode) return null;
    return (
        <Box>
            <Chat key={messageNode.value.id} messageNode={messageNode} actions={actions} />
            <ChatList messageNode={messageNode.next} actions={actions} />
        </Box>
    )
}

export default ChatList;
