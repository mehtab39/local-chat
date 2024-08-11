import { Box, Button, useDisclosure } from "@chakra-ui/react";
import UpdateChat from "./UpdateChat";
import { useEffect } from "react";
import useRender from "../hooks/useRender";
import { filter, fromEventPattern } from "rxjs";

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

        const observable$ = fromEventPattern(
            (handler) => msg.registerOnChange(handler),
            () => msg.unregisterOnChange()
        );

        const subscription = observable$.pipe(
            filter(impact => impact !== 0) 
        ).subscribe(impact => {
            if (impact === 1) {
                render();
            } else if (impact > 1) {
                listRender();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [listRender, msg, render]);

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
