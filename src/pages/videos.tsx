import { Flex, Box, Input, Button, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import ReactPlayer from "react-player";
import { useContext, useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from "../context/AuthContext";

export default function Videos() {
  const [videoUpload, setVideoUpload] = useState<File>(null);
  const [videoList, setVideoList] = useState<string[]>([]);

  const videoListRef = ref(storage, "videos/");
  const uploadVideo = () => {
    if (videoUpload === null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    uploadBytes(videoRef, videoUpload).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) =>
        setVideoList((prev) => [...prev, url])
      )
    );
  };
  useEffect(() => {
    listAll(videoListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const unique = videoList.filter(
    (elem, index, self) => index === self.indexOf(elem)
  );
  const { user, logOut } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      {user ? (
      <><Header /><Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />
          <Flex direction="column">
            <Box
              w="100%"
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <Input
                type="file"
                onChange={(e) => {
                  setVideoUpload(e.target.files[0]);
                } } />
              <Button ml="2" colorScheme={"pink"} onClick={uploadVideo}>
                Postar vídeo
              </Button>
            </Box>
            <Flex wrap="wrap" justifyContent="center">
              {unique.map((url) => (
                <Box key={v4()} p={["2", "8"]} bg="gray.800" borderRadius={8} m="6" display='flex' justifyContent='center'>
                  <Box
                    as="video"
                    src={url}
                    width={["100%", "75%"]}
                    maxWidth={1480}
                    height="100%"
                    controls={true} />
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex></>
      ): <Box h='100vh' justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
      <Text>Clique no botão abaixo e realize o login</Text>
      <Button colorScheme={"pink"} onClick={logOut}>Sair</Button>
    </Box>}
    </Flex>
  );
}
