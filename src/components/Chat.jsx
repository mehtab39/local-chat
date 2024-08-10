import { Box, Button, useDisclosure } from "@chakra-ui/react";
import UpdateChat from "./UpdateChat";

const Chat = ({ messageNode, actions }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const msg = messageNode.value;
    const handleDelete = () => {
        actions.deleteMessage(messageNode);
    }

    const handleHide = () => {
        actions.hideMessage(messageNode);
        onClose()
    }

    const handleUnhide = () => {
        actions.unhideMessage(messageNode);
        onClose()
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
                {msg.isHidden ? 'hidden' : msg.text}
            </Box>
            <Button ml={2} onClick={onOpen}>Click</Button>
            <UpdateChat isOpen={isOpen} onClose={onClose} onDelete={handleDelete} onHide={handleHide} onUnhide={handleUnhide} isHidden={msg.isHidden} onEdit={actions.onEdit}/>
        </Box>
    );
}

export default Chat;
