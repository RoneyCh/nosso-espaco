import {
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from 'react-hook-form'
  

type SignInFormData = {
  text: string;
  password: string

}

export default function SignIn() {
  const { register, handleSubmit, formState} = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);

  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input name='usuario' type='text' label="Aniversário de namoro(sem '/')" {...register('usuario')}></Input>
          <Input name='senha' type='password' label="O que eu mais gosto em você" {...register('senha')}></Input>
        </Stack>
        <Button type="submit" mt="6" colorScheme={"pink"} isLoading={formState.isSubmitting }>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
