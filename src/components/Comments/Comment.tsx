import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Comment({ comment, handleDelete }) {
  const [newTitle, setNewTitle] = useState<string>(comment.title);
  const [newOtherTitle, setNewOtherTitle] = useState<string>(comment.otherTitle);

  return (
    <Box>
      <Flex justifyContent="space-between" flexWrap='wrap' borderBottom='1px' mb='3'>
        <Box>
        <Text m='3' maxW='300'>{comment.title === "" ? newTitle : comment.title}</Text>
        </Box>
        <Box>
        <Text m='3' maxW='300'>{comment.otherTitle === "" ? newOtherTitle : comment.otherTitle}</Text>
        </Box>
        <Button
          colorScheme={"pink"}
          ml="2"
          p='0'
          mt='3'
          height='8'
          onClick={() => handleDelete(comment.id)}
        >
          <RiDeleteBinLine />
        </Button>
      </Flex>
    </Box>
  );
}
