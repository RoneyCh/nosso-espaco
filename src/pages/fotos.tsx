import { Flex, Input, Button, Image, Box, Text, Progress } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable
} from "firebase/storage";
import { v4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { Upload } from "../components/Upload/Upload";

export default function Fotos() {
  const [imageUpload, setImageUpload] = useState<File>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [progressBar, setProgressBar] = useState(0); 

  const imageListRef = ref(storage, "Fotos/");
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `Fotos/${imageUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadTask.on('state_changed',(snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgressBar(progress);
    });
    uploadBytes(imageRef, imageUpload).then((snapshot) =>{
      getDownloadURL(snapshot.ref).then((url) =>
        setImageList((prev) => [...prev, url])
      )
  });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const handleDelete = (url) => {
    let pictureRef = ref(storage, url);
    deleteObject(pictureRef)
      .then(() => {
        setImageList(imageList.filter((image) => image !== url));
        alert("Imagem deletada");
      })
      .catch((e) => console.log(e));
  };

  const verifyProgress = () => {
    if(progressBar === 100) {
      setProgressBar(0);
      alert('Concluído');
    }
    return progressBar;
  }

  const unique = imageList.filter(
    (elem, index, self) => index === self.indexOf(elem)
  );
  const { user, logOut } = useContext(AuthContext);
  return (
    <Flex direction="column" h="100vh">
      {user ? (
        <>
          <Header />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <SideBar />
            <Flex direction="column">
              <Upload upload={imageUpload} setUpload={setImageUpload} uploadFile={uploadImage} verifyProgress={verifyProgress} name='Postar foto'/>
              <Flex wrap="wrap" justifyContent="center">
                {unique.map((url) => (
                  <Box
                    key={v4()}
                    p={["6", "8"]}
                    bg="gray.800"
                    borderRadius={8}
                    m="6"
                  >
                    <Image src={url} w="sm" />
                    <Button
                      colorScheme={"pink"}
                      p="0"
                      height="8"
                      onClick={() => handleDelete(url)}
                    >
                      <RiDeleteBinLine />
                    </Button>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <Box
          h="100vh"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Text>Clique no botão abaixo e realize o login</Text>
          <Button colorScheme={"pink"} onClick={logOut}>
            Sair
          </Button>
        </Box>
      )}
    </Flex>
  );
}
