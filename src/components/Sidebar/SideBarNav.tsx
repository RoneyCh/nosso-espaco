import { Box, Stack, Text } from "@chakra-ui/react";
import { RiEmotionNormalLine, RiHomeLine, RiPhoneCameraLine, RiVideoLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";


export function SideBarNav() {

  const { logOut } = useContext(AuthContext)

    return (
        <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
          <NavLink icon={RiHomeLine} href="/home">Home</NavLink>
          <NavLink icon={RiPhoneCameraLine} href="/fotos">Fotos</NavLink>
          <NavLink icon={RiVideoLine} href="/videos">Vídeos</NavLink>
          <NavLink icon={RiEmotionNormalLine} href="/humor">Humor</NavLink>
        </NavSection>
        <Box>
          <Box onClick={logOut} cursor='pointer'>Sair</Box>
        </Box>
      </Stack>
    
    )
}

