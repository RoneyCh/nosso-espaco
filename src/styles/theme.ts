import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({

    colors: {
        gray:{
             "900": "#0f0f0f",
             "800":"#1F2029",
             "700":"#353646",
             "600":"#4B4D63",
             "500":"#616480",
             "400":"#797D9A",
             "300":"#9699B0",
             "200":"#B3B5C6",
             "100":"#D1D2DC",
             "50": "#EEEEF2",
        }
    },

    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },

    styles: {
        global: {
            body: {
                bgGradient:"linear(to-l, #000000, #1b1a1b)",
                color: 'gray.50'
            }
        }
    }
})