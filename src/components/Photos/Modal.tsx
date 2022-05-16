import { Modal as ChakraModel,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure, Image} from "@chakra-ui/react";

export const Modal = ({url}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <>
      <Image src={url} alt='' w='sm' onClick={onOpen}></Image>

      <ChakraModel isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='none'
            backdropFilter='blur(2px) hue-rotate(10deg)'/>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg='gray.900'>
            <Image alt='' src={url} w="sm" />
          </ModalBody>
        </ModalContent>
      </ChakraModel>
    </>
    )
}