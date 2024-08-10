import { Box, Button, useDisclosure } from "@chakra-ui/react";
import UpdateChat from "./UpdateChat";

const Chat = ({ messageNode, actions }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const msg = messageNode.message;
    const handleDelete = () => {
        actions.deleteMessage(messageNode);
    }
    return (
        <Box display="flex" alignItems="center" p={2} mb={2}>
            <Box
                bg={msg.isSelfUserAuthor ? 'lightblue' : 'lightgray'}
                p={3}
                borderRadius="md"
                maxWidth="70%"
                wordBreak="break-word"
            >
                {msg.text}
            </Box>
            <Button ml={2} onClick={onOpen}>Click</Button>
            <UpdateChat isOpen={isOpen} onClose={onClose} onDelete={handleDelete} onHide={actions.onHide} onEdit={actions.onEdit}/>
        </Box>
    );
}

export default Chat;
