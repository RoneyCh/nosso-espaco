import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";

export default function Comment({ comment, handleDelete, createdAt }) {
  const [newTitle, setNewTitle] = useState<string>(comment.title);
  const [newOtherTitle, setNewOtherTitle] = useState<string>(
    comment.otherTitle
  );
  const [date, setDate] = useState<number>();
  const [dateVv, setDateVv] = useState<number>();

  const getDate = async () => {
    let a = await createdAt;
    if (a !== null) {
      const b = (await (a.seconds + a.nanoseconds / 1e9)) * 1000;
      return b;
    }
  };

  useEffect(() => {
    getDate().then((a) => {
      setDate(a);
      setDateVv(a);
    });
  }, []);

  return (
    <Box>
      <Flex flexWrap="wrap" borderBottom="1px" mb="3">
        <Box w='100%'>
          <Text m="3" maxW="300">
            {comment.otherTitle === "" ? newOtherTitle : comment.otherTitle}
          </Text>
          <Text m="3" maxW="300">
            {comment.title === "" ? newTitle : comment.title}
          </Text>
        </Box>
        <Box>
          <Text>{moment(date).fromNow()}</Text>
          <Button
            colorScheme={"blue"}
            p="0"
            height="8"
            onClick={() => handleDelete(comment.id)}
          >
            <RiDeleteBinLine />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
