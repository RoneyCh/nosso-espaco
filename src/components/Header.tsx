import { Flex, Icon, Text, HStack, Box, Avatar } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function Header() {
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
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        Nosso Espaço
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex align="center" ml="auto">
        <HStack 
            spacing='8'
            mx='8'
            pr='8'
            py='1'
            color='gray.300'
            borderRightWidth={1}
            borderColor='gray.700'
        >
          <Icon as={RiNotificationLine} fontSize="20" />
        </HStack>
        <Flex align='center'>
            <Box mr='4' textAlign='right'>
                <Text>Roney Christian</Text>
            </Box>
        </Flex>
        <Avatar size='md' name='Roney Christian' src='https://github.com/RoneyCh.png' />
      </Flex>
    </Flex>
  );
}
