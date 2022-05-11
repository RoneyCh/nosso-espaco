import { Flex, Input,Button} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { storage } from '../firebase';
import { ref, uploadBytes, listAll } from 'firebase/storage'
import { v4 } from 'uuid';



export default function Fotos() {

    const [imageUpload, setImageUpload] = useState<File>(null); 
    const [imageList, setImageList] = useState<File[]>([]);

    const uploadImage = () => {
        if(imageUpload === null) return;
        const imageRef = ref(storage, `Fotos/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(() => alert('image uploaded'))

    }

    useEffect(() => {
        listAll()


    },[])


    return (
        <><Header />
        <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />
        <Input type='file' onChange={(e) => {setImageUpload(e.target.files[0])}}/>
        <Button onClick={uploadImage}>Postar foto</Button>
        </Flex>
        </>
    )
}