import Router from "next/router";
import React, { useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export default function TimeOut() {

  return (
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Box>
        <Text>Você não tem permissão para acessar</Text>
        <Button mt="6" colorScheme={"purple"} onClick={() => Router.push('/')}>
          Sair
        </Button>
      </Box>
    </Flex>
  );    
}
