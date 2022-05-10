import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

export default function Videos() {
    return (
        <><Header />
        <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />
        <h1>Videos</h1>
        </Flex>
        </>
    )
}