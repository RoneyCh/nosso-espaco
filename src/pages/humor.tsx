import { Box, Button, Flex, FormLabel, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { db } from "../firebase";
import { collection, addDoc, query, onSnapshot, QuerySnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from "react";
import Comment from "../components/Comments/Comment";

export default function Humor() {
  const [title, setTitle] = useState<string>("");
  const [comments, setComments] = useState([]);

  useEffect(()=> {
    const q = query(collection(db, 'comments'));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let commentArray = [];
      QuerySnapshot.forEach((doc) => {
        commentArray.push({...doc.data(), id: doc.id});
      })
      setComments(commentArray);
    });
    return () => unsub();
  }, [])

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'comments', id));
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "comments"), {
        title
      });
      setTitle("");
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Roney
            </Text>
            <Box>
              {comments.map(comment => (
                <Comment key={comment.id} comment={comment} handleDelete={handleDelete}/>
              ))}
            </Box>
            <Box as="form" onSubmit={handleSubmit}>
              <FormLabel>Como está se sentido?</FormLabel>
              <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
            
            <Box>
              <Button type="submit">Comentar</Button>
            </Box>
            </Box>
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Vivian
            </Text>
            <Text fontSize="lg" mb="4">
              Cansada
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
