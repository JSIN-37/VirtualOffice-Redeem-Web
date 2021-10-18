import Home from "./home/Home";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        brand: {
            100: "#E3DBF9",
            500: "#4E29B2",
            900: "#391795",
        },
        fonts: {
            body: "mulish, sans-serif",
            heading: "mulish, sans-serif",
            mono: "Menlo, monospace",
        },
    },
})
// const theme = createTheme({
//     typography: {
//         fontFamily: [
//             'mulish',
//             'Open Sans',
//             'sans-serif',
//         ].join(','),
//         button: {
//             textTransform: 'capitalize',
//         },
//     },
//     palette: {
//         primary: {
//             main: '#4E29B2',
//             light: '#E3DBF9',
//             dark: '#391795',
//         }
//     },
// });

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Home />
        </ChakraProvider>
    );
};

export default App;
