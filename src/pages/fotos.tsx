import { Flex, Input, Button, Image, Box, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from "../context/AuthContext";

export default function Fotos() {
  const [imageUpload, setImageUpload] = useState<File>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  
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
  const { user, logOut } = useContext(AuthContext)
  return (
    <Flex direction="column" h="100vh">
      {user ? (
      <><Header /><Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SideBar />
          <Flex direction='column'>
            <Box w='100%' alignItems='center' justifyContent='center' display='flex'>
              <Input
                type="file"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                } } />
              <Button ml='2' onClick={uploadImage} colorScheme={"pink"}>Postar foto</Button>
            </Box>
            <Flex wrap='wrap' justifyContent='center'>
              {unique.map((url) => (
                <Box key={v4()} p={['6', '8']}
                  bg='gray.800'
                  borderRadius={8} m='6'>
                  <Image src={url} w="sm" />
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
