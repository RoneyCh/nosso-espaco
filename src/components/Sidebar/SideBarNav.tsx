import { Stack } from "@chakra-ui/react";
import { RiEmotionNormalLine, RiPhoneCameraLine, RiVideoLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarNav() {
    return (
        <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
          <NavLink icon={RiPhoneCameraLine}>Fotos</NavLink>
          <NavLink icon={RiVideoLine}>Vídeos</NavLink>
          <NavLink icon={RiEmotionNormalLine}>Humor</NavLink>
        </NavSection>
      </Stack>
    )
}