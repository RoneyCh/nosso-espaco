import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Select,
  Stack,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
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
import {
  RiDeleteBinLine,
  RiEmotionHappyLine,
  RiEmotionSadLine,
  RiMessage3Line,
  RiSendBackward,
  RiSendPlaneLine,
} from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import TimeOut from "../components/timeOut";

type FeelingData = {
  id: string;
  title: string;
  range: number;
};

type FeelingDataVv = {
  id: string;
  otherTitle: string;
  otherRange: number;
};

const Humor = () => {
  const [title, setTitle] = useState<string>("");
  const [feeling, setFeeling] = useState<FeelingData[]>([]);
  const [otherTitle, setOtherTitle] = useState<string>("");
  const [feelingVv, setFeelingVv] = useState<FeelingDataVv[]>([]);
  const [range, setRange] = useState<number>();
  const [otherRange, setOtherRange] = useState<number>();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title !== "" || range !== undefined) {
      await addDoc(collection(db, "feelings"), {
        title,
        range,
      });
      setTitle("");
    }
  };

  const handleSubmitVv = async (e) => {
    e.preventDefault();
    if (otherTitle !== "" || otherRange !== undefined) {
      await addDoc(collection(db, "feelingsVv"), {
        otherTitle,
        otherRange,
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

  const { user } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      {user ? (
        <>
          <Header />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <SideBar />
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              alignItems="flex-start"
            >
              <Box
                p={["6", "8"]}
                bg="gray.900"
                borderRadius={8}
                display="flex"
                flexDirection="column"
                height="50vh"
                width='100%'
              >
                <Flex>
                  <Text fontSize="lg" mb="4" mr="3">
                    Roney
                  </Text>
                  <Box fontSize="lg" mb="4" width='100%'>
                    {feeling.map((x) => (
                        <><Flex key={x.id ? x.id : 1}>
                        <Text color="purple.600">{x.title ? x.title : " "}</Text>
                        <Button
                          colorScheme={"none"}
                          p="0"
                          height="8"
                          border="none"
                          position="relative"
                          pb="4"
                          onClick={() => handleDelete(x.id ? x.id : "")}
                        >
                          <RiDeleteBinLine />
                        </Button>
                      </Flex><Options handleSubmit={handleSubmit} setTitle={setTitle} setRange={setRange} range={x.range ? x.range : range} /></>
                        ))}
                        </Box>
                      </Flex>
                      {feeling.length == 0 ? (
                        <Options handleSubmit={handleSubmit} setTitle={setTitle} setRange={setRange} range={range} />
                      ) : ''}
                      </Box>
              <Box p={["6", "8"]}
                bg="gray.900"
                borderRadius={8}
                display="flex"
                flexDirection="column"
                height="50vh"
                width='100%'>
                <Flex>
                  <Text fontSize="lg" mb="4" mr="3">
                    Vivian
                  </Text>
                  <Box fontSize="lg" mb="4" width='100%'>
                    {feelingVv.map((x) => (
                      <><Flex key={x.id}>
                        <Text color="purple.600">
                          {x.otherTitle ? x.otherTitle : ""}
                        </Text>
                        <Button
                          colorScheme={"none"}
                          p="0"
                          height="8"
                          border="none"
                          position="relative"
                          pb="4"
                          onClick={() => handleDeleteVv(x.id)}
                        >
                          <RiDeleteBinLine />
                        </Button>
                      </Flex><Options
                          handleSubmit={handleSubmitVv}
                          setTitle={setOtherTitle}
                          setRange={setOtherRange}
                          range={x.otherRange ? x.otherRange : otherRange} /></>
                    ))}
                  </Box>
                </Flex>
                {feelingVv.length == 0 ? (<Options
                  handleSubmit={handleSubmitVv}
                  setTitle={setOtherTitle}
                  setRange={setOtherRange}
                  range={otherRange}
                /> ) : ''}
                
              </Box>
            </SimpleGrid>
          </Flex>
        </>
      ) : (
        <TimeOut />
      )}
    </Flex>
  );
};

export default Humor;
