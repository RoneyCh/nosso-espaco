import { Flex, Box, Input, Button } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import ReactPlayer from "react-player";

export default function Videos() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Flex direction="column">
          <Box
            w="100%"
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Input type="file" />
            <Button ml="2" colorScheme={"pink"}>
              Postar vídeo
            </Button>
          </Box>
          <Box
            as="video"
            id="myVedio"
            src="https://firebasestorage.googleapis.com/v0/b/uploadingfile-c987f.appspot.com/o/videos%2FMagic%20Lesson%201%20-%2001.mp4?alt=media&token=18009714-ff9c-4b67-b08b-14e2081e277d"
            width={["100%","75%"]}
            mt='6'
            maxWidth={1480}
            height="100%"
            controls={true}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
