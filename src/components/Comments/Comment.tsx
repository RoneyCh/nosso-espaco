import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";


export default function Comment({ comment, handleDelete, createdAt }) {
  const [newTitle, setNewTitle] = useState<string>(comment.title);
  const [newOtherTitle, setNewOtherTitle] = useState<string>(comment.otherTitle);
  const [date, setDate] = useState<number>();
  const [dateVv, setDateVv] = useState<number>();

  const getDate = async () => {
      let a =  await createdAt;
      if(a !== null) {
        const b = await (a.seconds + (a.nanoseconds/1e+9)) * 1000
        return b;
      }
    
  }

  useEffect(() => {
    getDate().then(a => {
      setDate(a); 
      setDateVv(a);
    });
  }, [])


  return (
    <Box>
      <Flex justifyContent="space-between" flexWrap='wrap' borderBottom='1px' mb='3'>
        <Box>
        <Text m='3' maxW='300'>{comment.title === "" ? newTitle : comment.title}</Text>
        <Text>{moment(date).fromNow()}</Text>
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
