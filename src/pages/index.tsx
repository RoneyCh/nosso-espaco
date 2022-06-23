import {
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
  

type SignInFormData = {
  usuario: string;
  senha: string;

}

const singInFormSchema = yup.object().shape({
  usuario: yup.string().required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório')
})

export default function SignIn() {

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(singInFormSchema)
  });
  
  const { errors } = formState;

  const { signIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await signIn(values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth="360px"
        bg="gray.900" 
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input name='usuario' type='text' label="Aniversário de namoro" error={errors.usuario} {...register('usuario')}></Input>
          <Input name='senha' type='password' label="O que eu mais gosto em você" error={errors.senha} {...register('senha')}></Input>
        </Stack>
        <Button type="submit" mt="6" colorScheme={"purple"} isLoading={formState.isSubmitting }>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
