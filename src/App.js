import Home from "./home/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        purple: {
            500: "#5B39AA",
            600: "#482D87",
        },
    },
    fonts: {
        body: "Segoe UI",
        heading: "Segoe UI",
        mono: "Menlo, monospace",
    },
})

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Home />
        </ChakraProvider>
    );
};

export default App;
