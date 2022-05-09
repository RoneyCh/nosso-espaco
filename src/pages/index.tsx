import {
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

 

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth="360px"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={4}>
          <Input name='usuario' type='text' label="Aniversário de namoro(sem '/')"></Input>
          <Input name='senha' type='senha' label="O que eu mais gosto em você"></Input>
        </Stack>
        <Button type="submit" mt="6" colorScheme={"pink"}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}