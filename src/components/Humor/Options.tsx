import { Stack, Select, Button, Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from '@chakra-ui/react'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'

type OptionsData = {
    handleSubmit(e:FormEvent): Promise<void>;
    setTitle: Dispatch<SetStateAction<string>>;
    setRange: Dispatch<SetStateAction<number>>;
    range: number;
}


export function Options({handleSubmit,setTitle, range, setRange}:OptionsData) {
  return (
    <Box width='100%' alignItems='flex-start' justifyContent='center'>
      <Text display='inline-block'>Nível</Text><Stack as="form" onSubmit={handleSubmit}>
      <Flex>
    <Text fontSize={'2rem'}>-</Text>
    <Slider
            width="100%"
            aria-label="slider-ex-1"
            defaultValue={range}
            onChange={(e) => setRange(e.valueOf())}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize={'2rem'}>+</Text>
      </Flex>
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
      </Stack></Box>
  )
}

