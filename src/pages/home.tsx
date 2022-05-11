import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from '../components/Sidebar/index';
import { AuthContext } from "../context/AuthContext";


export default function Home() {

    const { user } = useContext(AuthContext)

    return (
        
        <Flex direction='column' h='100vh'>
            <Header /><Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                    <SideBar />

                    <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignItems='flex-start'>
                        <Box
                            p={['6', '8']}
                            bg='gray.800'
                            borderRadius={8}

                        >
                            <Text fontSize='lg' mb='4'>Humor</Text>
                            <FontAwesomeIcon icon={faSmileBeam} fontSize='100' />
                        </Box>
                        <Box
                            p={['6', '8']}
                            bg='gray.800'
                            borderRadius={8}

                        >
                            <Text fontSize='lg' mb='4'>Comentário(s) do dia</Text>

                        </Box>
                    </SimpleGrid>
                </Flex>
        </Flex>
    )
}