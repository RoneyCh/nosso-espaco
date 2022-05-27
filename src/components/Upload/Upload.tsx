import { Box, Input, Button, Progress } from "@chakra-ui/react";

export const Upload = ({setUpload, uploadFile, verifyProgress, name}) => {
    return (
        <><Box
            w="100%"
            alignItems="center"
            justifyContent="center"
            display="flex"
        >
            <Input
                type="file"
                onChange={(e) => {
                    setUpload(e.target.files[0]);
                } } />
            <Button ml="2" onClick={uploadFile} colorScheme={"blue"}>
                {name}
            </Button>

        </Box><Progress value={verifyProgress()} colorScheme='blue' size='md' mt='2' borderRadius='full' /></>
    )
}