import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBarDrawer } from "../context/SideBarDrawerContext";
import { Logo } from "./Header/Logo";
import { Notifications } from "./Header/Notifications";
import { Profile } from "./Header/Profile";

export function Header() {

  const { onOpen } = useSideBarDrawer()

  const isMobile = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isMobile && (
        <IconButton 
        aria-label="Open navigation"
        icon={<Icon as={RiMenuLine} />} 
        fontSize='24'
        variant='unstyled' 
        onClick={onOpen}
        mr='2'
        >
        </IconButton>
      )}
      <Logo />

      <Flex align="center" ml="auto">
        <Notifications />
        <Profile showProfileData={isMobile}/>
      </Flex>
    </Flex>
  );
}
