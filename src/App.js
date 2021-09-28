import Home from "./home/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'mulish',
            'Open Sans',
            'sans-serif',
        ].join(','),
        button: {
            textTransform: 'capitalize',
        },
    },
    palette: {
        primary: {
            main: '#471DBC',
            light: '#E3DBF9',
            dark: '#391795',
        }
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
};

export default App;
