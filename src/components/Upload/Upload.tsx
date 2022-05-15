import { Box, Input, Button, Progress } from "@chakra-ui/react";

export const Upload = ({upload, setUpload, uploadFile, verifyProgress, name}) => {
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
            <Button ml="2" onClick={uploadFile} colorScheme={"pink"}>
                {name}
            </Button>

        </Box><Progress value={verifyProgress()} colorScheme='pink' size='md' mt='2' borderRadius='full' /></>
    )
}