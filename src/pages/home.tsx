import { Box, Button, Flex, FormLabel, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { db } from "../firebase";
import { collection, addDoc, query, onSnapshot, doc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";
import Comment from "../components/Comments/Comment";
import { AuthContext } from "../context/AuthContext";
import TimeOut from "../components/timeOut";


type CommentData = {
  createdAt: string;
  comment: string;
  id: string;
  createdAtVv: string;
}

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [otherTitle, setOtherTitle] = useState<string>("");
  const [otherComments, setOtherComments] = useState<CommentData[]>([]);


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

  useEffect(()=> {
    const q = query(collection(db, 'comments2'));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let commentArray = [];
      QuerySnapshot.forEach((doc) => {
        commentArray.push({...doc.data(), id: doc.id});
      })
      setOtherComments(commentArray);
    });
    return () => unsub();
  }, [])

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'comments', id));
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "comments"), {
        title,
        createdAt: serverTimestamp()
      });
      setTitle("");
    }
  };

  const handleDeleteVv = async (id: string) => {
    await deleteDoc(doc(db, 'comments2', id));
  } 

  const handleSubmitVv= async (e) => {
    e.preventDefault();
    if (otherTitle !== "") {
      await addDoc(collection(db, "comments2"), {
        otherTitle,
        createdAtVv: serverTimestamp()
      });
      setOtherTitle("");
    }
  };
  const { user } = useContext(AuthContext)
  return (
    <Flex direction="column" h="100vh">
      {user ? (
      <>
      <Header /><Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.900" borderRadius={8}>
              <Text fontSize="lg" mb="4">
                Roney
              </Text>
              <Box>
                {comments.map(comment => (
                  <Comment key={comment.id} comment={comment} handleDelete={handleDelete} createdAt={comment.createdAt} />
                ))}
              </Box>
              <Box as="form" onSubmit={handleSubmit}>
                <FormLabel>Coloca algo top pra eu ver depois</FormLabel>
                <Input focusBorderColor="purple.500" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

                <Box>
                  <Button colorScheme={"purple"} mt='4' type="submit">Comentar</Button>
                </Box>
              </Box>
            </Box>
            <Box p={["6", "8"]} bg="gray.900" borderRadius={8}>
              <Text fontSize="lg" mb="4">
                Vivian
              </Text>
              <Box>
                {otherComments.map(comment => (
                  <Comment key={comment.id} comment={comment} handleDelete={handleDeleteVv} createdAt={comment.createdAtVv} />
                ))}
              </Box>
              <Box as="form" onSubmit={handleSubmitVv}>
                <FormLabel>Coloca algo top pra eu ver depois</FormLabel>
                <Input focusBorderColor="purple.500" type='text' value={otherTitle} onChange={(e) => setOtherTitle(e.target.value)} />

                <Box>
                  <Button colorScheme={"purple"} mt='4' type="submit">Comentar</Button>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Flex></>
):
(
<TimeOut />
)
}
</Flex>
  );
}
