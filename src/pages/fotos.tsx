import { Flex, Input, Button, Image, Box, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function Fotos() {
  const [imageUpload, setImageUpload] = useState<File>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageDisplay, setImageDisplay] = useState<string[]>([]);
  
  const imageListRef = ref(storage, "Fotos/");
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `Fotos/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) =>
        setImageList((prev) => [...prev, url])
      )
    );
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) =>{
          setImageList((prev) => [...prev, url])
        }
        );
      });
    });
  }, []);

  const unique = imageList.filter((elem,index,self) => index === self.indexOf(elem));

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Flex direction='column'>
        <Box>
          <Input
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <Button onClick={uploadImage} colorScheme={"pink"}>Postar foto</Button>
        </Box>
        <Flex wrap='wrap' justifyContent='center'>
          {unique.map((url) => (
              <Box  p={['6', '8']}
              bg='gray.800'
              borderRadius={8} m='6' >
                <Image src={url} w="sm" />
                </Box>
          ))}
          </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
}
