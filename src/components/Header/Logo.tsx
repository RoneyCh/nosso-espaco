import { Text } from '@chakra-ui/react'

export function Logo() {
    return (
        <Text fontSize={['2xl', '3xl']} fontWeight="bold" letterSpacing="tight" w="64">
        Nosso Espaço
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>
    )
}