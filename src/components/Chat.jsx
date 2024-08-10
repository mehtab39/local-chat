import { Box, Button, useDisclosure } from "@chakra-ui/react";
import UpdateChat from "./UpdateChat";
import { useEffect } from "react";
import useRender from "../hooks/useRender";

const Chat = ({ msg, actions, listRender }) => {
    const render = useRender();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDelete = () => {
        actions.deleteMessage(msg);
        onClose()
    }

    const handleHide = () => {
        actions.hideMessage(msg);
        onClose()
    }

    const handleUnhide = () => {
        actions.unhideMessage(msg);
        onClose()
    }

    useEffect(() => {
        msg.registerOnChange((impact) => {
            if (impact === 0) return;
            if (impact === 1) render();
            if (impact > 1) listRender(); 
        })
        return () => {
            msg.unregisterOnChange();
        }
    }, [msg])
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
