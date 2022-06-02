import { Stack, Select, Button } from '@chakra-ui/react'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'

type OptionsData = {
    handleSubmit(e:FormEvent): Promise<void>;
    setTitle: Dispatch<SetStateAction<string>>;
}


export function Options({handleSubmit,setTitle}:OptionsData) {
  return (
    <Stack as="form" onSubmit={handleSubmit}>
                <Select color='purple.600' onChange={(e) => setTitle(e.target.value)}>
                <option value="Cansadx">Cansadx</option>
                  <option value="Feliz">Feliz</option>
                  <option value="Triste">Triste</option>
                  <option value="Ocupadx">Ocupadx</option>
                  <option value="Chateadx">Chateadx</option>
                  <option value="De boas">De boas</option>
                  <option value="Estressadx">Estressadx</option>
                  <option value="Apenas reclamações">Apenas reclamações</option>
                  <option value="Queria sushi">Queria sushi</option>
                  <option value="Ansiosa">Ansiosa</option>
                  <option value="Procrastinando">Procrastinando</option>
                  <option value="Doente">Doente</option>
                </Select>
                <Button colorScheme={"purple"} type="submit">Enviar</Button>
              </Stack>
  )
}

