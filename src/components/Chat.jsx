import { Box, Button, useDisclosure } from "@chakra-ui/react";
import UpdateChat from "./UpdateChat";

const Chat = ({ msg, actions }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDelete = () => {
        actions.deleteMessage(msg);
    }

    const handleHide = () => {
        actions.hideMessage(msg);
        onClose()
    }

    const handleUnhide = () => {
        actions.unhideMessage(msg);
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
