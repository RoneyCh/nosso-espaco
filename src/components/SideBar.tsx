import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { RiEmotionNormalLine, RiPhoneCameraLine, RiVideoLine } from "react-icons/ri";

export function SideBar() {
    return (
        <Box as="aside" w='64' mr='8'>
            <Stack spacing='12' align='flex-start'>
                <Box>
                    <Text fontWeight='bold' color='gray.400'>Geral</Text>
                    <Stack spacing='4' mt='8' align='stretch'>
                        <Link display='flex' alignItems='center'>
                            <Icon as={RiPhoneCameraLine} fontSize='20'/>
                            <Text ml='4' fontWeight='medium'>Fotos</Text>
                        </Link>
                        <Link display='flex' alignItems='center'>
                            <Icon as={RiEmotionNormalLine} fontSize='20'/>
                            <Text ml='4' fontWeight='medium'>Humor</Text>
                        </Link>
                        <Link display='flex' alignItems='center'>
                            <Icon as={RiVideoLine} fontSize='20'/>
                            <Text ml='4' fontWeight='medium'>Vídeos</Text>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}