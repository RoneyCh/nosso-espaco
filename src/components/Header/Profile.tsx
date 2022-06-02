import { Flex, Box, Avatar, Text, Button, Input, FormLabel } from "@chakra-ui/react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState } from "react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const [imageUpload, setImageUpload] = useState<File>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const imageUrlRef = ref(storage, "profile/");

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `profile/profilePicture`);
    uploadBytes(imageRef, imageUpload).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => setImageUrl(url))
    );
  };

  useEffect(() => {
    listAll(imageUrlRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrl(url);
        });
      });
    });
  }, []);

  const verifyClick = () => {
    if (isClicked === true) return "flex";
    else return "none";
  };

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Nós</Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="nos"
        src={imageUrl}
        onClick={() => setIsClicked(!isClicked)}
      />
      <Box display={verifyClick()}>
      <FormLabel htmlFor="changePic" cursor='pointer' ml='3'>
        Alterar Foto
      </FormLabel>
      <Input
        display='none'
        id='changePic'
        type="file"
        w={["20px", "150px"]}
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      </Box>
      <Button
        _hover={{ bg: "purple.600" }}
        p="0"
        onClick={uploadImage}
        _active={{
          bg: "#4b25f1",
          transform: "scale(0.98)",
          borderColor: "#450868",
        }}
        display={verifyClick()}
        flexDirection="column"
        bg="none"
        fontSize="sm"
        color="gray.200"
      >
        OK
      </Button>
    </Flex>
  );
}
