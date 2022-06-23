import { Flex, Box, Input, Button, Text, Progress } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { Upload } from "../components/Upload/Upload"; 
import { useContext, useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { RiDeleteBinLine } from "react-icons/ri";
import TimeOut from "../components/timeOut";

export default function Videos() {
  const [videoUpload, setVideoUpload] = useState<File>(null);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [progressBar, setProgressBar] = useState<number>(0)

  const videoListRef = ref(storage, "videos/");
  const uploadVideo = () => {
    if (videoUpload === null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(videoRef, videoUpload);
    uploadTask.on('state_changed',(snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgressBar(progress);
    });
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

  const handleDelete = (url) => {
    let videoRef = ref(storage, url);
    deleteObject(videoRef)
      .then(() => {
        setVideoList(videoList.filter((video) => video !== url));
        alert("Vídeo deletado");
      })
      .catch((e) => console.log(e));
  };

  const verifyProgress = () => {
    if(progressBar === 100) {
      setProgressBar(0);
      alert('Concluído')
    }
    return progressBar;
  }
    
  const unique = videoList.filter(
    (elem, index, self) => index === self.indexOf(elem)
  );

  const { user } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      {user ? (
      <><Header /><Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />
          <Flex direction="column">
          <Upload setUpload={setVideoUpload} uploadFile={uploadVideo} verifyProgress={verifyProgress} name='Postar vídeo'/>
            <Flex wrap="wrap" justifyContent="center">
              {unique.map((url) => (
                <Box key={v4()} p={["2", "8"]} bg="gray.900" borderRadius={8} m="6" display='flex' justifyContent='center' alignItems='center'>
                  <Box justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
                  <Box
                    as="video"
                    src={url}
                    width={["100%", "75%"]}
                    maxWidth={1480}
                    height="100%"
                    controls={true} />
                    <Button
                      colorScheme={"purple"}
                      p="0"
                      height="8"
                      onClick={() => handleDelete(url)}
                      alignSelf='flex-start'
                    >
                      <RiDeleteBinLine />
                    </Button>
                    </Box>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex></>
      ) : (
        <TimeOut />
      )}
    </Flex>
  );
}
