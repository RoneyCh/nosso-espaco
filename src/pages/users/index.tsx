import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from '../../components/Sidebar/index';

export default function UserList() {
    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <SideBar />
                <Box flex='1' borderRadius='8' bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Usuários</Heading>

                        <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine}/>}>Criar novo</Button>
                    </Flex>
                    <Table colorScheme='whiteAlpha'>
                        <Thead>
                            <Tr>
                                <Th px='6' color='gray.300' width='8'>
                                    <Checkbox colorScheme='pink'/>
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de cadastro</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px='6'>
                                    <Checkbox colorScheme='pink'/>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight='bold'>Roney Christian</Text>
                                    </Box>
                                </Td>
                                <Td>25 de Maio, 2022</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </Box>
    )
}