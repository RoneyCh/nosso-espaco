import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Comment({
    comment,
    handleDelete,
}) {
    const [newTitle, setNewTitle] = useState<string>(comment.title)
    

    return (
        <Box>
            <Input type='text' value={comment.title === '' ? newTitle : comment.title}/>
            <Box>
                <Button onClick={() => handleDelete(comment.id)}><RiDeleteBinLine/></Button>
            </Box>

        </Box>
    )
}