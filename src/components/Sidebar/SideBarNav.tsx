import { Stack } from "@chakra-ui/react";
import { RiEmotionNormalLine, RiHomeLine, RiPhoneCameraLine, RiVideoLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
    return (
        <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
          <NavLink icon={RiHomeLine} href="/home">Home</NavLink>
          <NavLink icon={RiPhoneCameraLine} href="/fotos">Fotos</NavLink>
          <NavLink icon={RiVideoLine} href="/videos">Vídeos</NavLink>
          <NavLink icon={RiEmotionNormalLine} href="/humor">Humor</NavLink>
        </NavSection>
      </Stack>
    )
}