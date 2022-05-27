import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSideBarDrawer } from "../../context/SideBarDrawerContext";
import { SideBarNav } from "./SideBarNav";

export function SideBar() {

  const { isOpen, onClose } = useSideBarDrawer();

  const isDrawer = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawer) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bgGradient="linear(to-l, #0f1320, #06182b)" p='4'>
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}
