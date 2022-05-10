import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

export default function Humor() {
    return (
        <><Header />
        <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />
        <h1>Humor</h1>
        </Flex>
        </>
    )
}