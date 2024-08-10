import React, { useCallback, useState } from 'react';
import { Input as ChakraInput, Button, Box } from '@chakra-ui/react';

const Input = ({ sendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = useCallback(() => {
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    }, [sendMessage, input]);

    return (
        <Box display="flex" alignItems="center" p={2}>
            <ChakraInput
                placeholder="Type your message here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                mr={2}
                size="md"
            />
            <Button onClick={handleSend} colorScheme="blue">
                Send
            </Button>
        </Box>
    );
};

export default Input;
