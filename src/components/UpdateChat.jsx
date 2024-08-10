import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, VStack } from "@chakra-ui/react";

const UpdateChat = ({ isOpen, onClose, onDelete, onHide, onUnhide,  isHidden, onEdit }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Message</ModalHeader>
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        <Button colorScheme="red" onClick={onDelete}>
                            Delete Message
                        </Button>
                        {!isHidden  ? <Button colorScheme="yellow" onClick={onHide}>
                            Hide Message
                        </Button>
                         : <Button colorScheme="blue" onClick={onUnhide}>
                            Unhide Message
                        </Button>}
                        <Button colorScheme="blue" onClick={onEdit}>
                            Edit Message
                        </Button>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateChat;
