import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

export default function Fotos() {
    return (
        <><Header />
        <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />
        <h1>Fotos</h1>
        </Flex>
        </>
    )
}