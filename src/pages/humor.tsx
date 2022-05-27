import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Select,
  Stack,
  Button,
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { Options } from "../components/Humor/Options";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { RiDeleteBinLine } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";

type FeelingData = {
  id: string;
  title: string;
};

type FeelingDataVv = {
  id: string;
  otherTitle: string;
};


const Humor = () => {
  const [title, setTitle] = useState<string>("");
  const [feeling, setFeeling] = useState<FeelingData[]>([]);
  const [otherTitle, setOtherTitle] = useState<string>("");
  const [feelingVv, setFeelingVv] = useState<FeelingDataVv[]>([]);

  useEffect(() => {
    const q = query(collection(db, "feelings"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let feelingtArray = [];
      QuerySnapshot.forEach((doc) => {
        feeling.splice(0);
        feelingtArray.splice(0);
        feelingtArray.push({ ...doc.data(), id: doc.id });
      });
      setFeeling(feelingtArray);
    });
    return () => unsub();
  });

  useEffect(() => {
    const q = query(collection(db, "feelingsVv"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let feelingtArray = [];
      QuerySnapshot.forEach((doc) => {
        feelingVv.splice(0);
        feelingtArray.splice(0);
        feelingtArray.push({ ...doc.data(), id: doc.id });
      });
      setFeelingVv(feelingtArray);
    });
    return () => unsub();
  });

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "feelings"), {
        title,
      });
      setTitle("");
    }
  };

  const handleSubmitVv = async (e) => {
    e.preventDefault();
    if (otherTitle !== "") {
      await addDoc(collection(db, "feelingsVv"), {
        otherTitle,
      });
      setOtherTitle("");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "feelings", id));
  };

  const handleDeleteVv = async (id: string) => {
    await deleteDoc(doc(db, "feelingsVv", id));
  };

  const { user, logOut } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      {user ? (
      <><Header /><Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box
              p={["6", "8"]}
              bg="gray.800"
              borderRadius={8}
              display="flex"
              flexDirection="column"
            >
              <Flex>
                <Text fontSize="lg" mb="4" mr="3">
                  Roney
                </Text>
                <Box fontSize="lg" mb="4">
                  {feeling.map((x) => (
                    <Flex key={x.id}>
                      <Text color="pink.600">{x.title}</Text>
                      <Button
                        colorScheme={"none"}
                        p="0"
                        height="8"
                        border="none"
                        position='relative'
                        pb='4'
                        onClick={() => handleDelete(x.id)}
                      >
                        <RiDeleteBinLine />
                      </Button>
                    </Flex>
                  ))}
                </Box>
              </Flex>
              <Options handleSubmit={handleSubmit} setTitle={setTitle}/>
            </Box>
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
              <Flex>
                <Text fontSize="lg" mb="4" mr="3">
                  Vivian
                </Text>
                <Box fontSize="lg" mb="4">
                  {feelingVv.map((x) => (
                    <Flex key={x.id}>
                      <Text color="pink.600">{x.otherTitle}</Text>
                      <Button
                        colorScheme={"none"}
                        p="0"
                        height="8"
                        border="none"
                        position='relative'
                        pb='4'
                        onClick={() => handleDeleteVv(x.id)}
                      >
                        <RiDeleteBinLine />
                      </Button>
                    </Flex>
                  ))}
                </Box>
              </Flex>
              <Options handleSubmit={handleSubmitVv} setTitle={setOtherTitle}/>
            </Box>
          </SimpleGrid>
        </Flex></>
      ) : <Box h='100vh' justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
      <Text>Clique no botão abaixo e realize o login</Text>
      <Button colorScheme={"pink"} onClick={logOut}>Sair</Button>
    </Box>}
    </Flex>
  );
};

export default Humor;
