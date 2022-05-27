import { Icon, Text } from '@chakra-ui/react'
import { RiHeart2Line } from 'react-icons/ri'

export function Logo() {
    return (
        <Text fontSize={['20px', '3xl']} fontWeight="bold" letterSpacing="tight" w="64">
        Nosso Espaço
        <Icon as={RiHeart2Line} ml="1" color="blue.400"/>
      </Text>
    )
}