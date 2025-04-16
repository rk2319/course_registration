import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RegistrationProvider } from '../components/RegistrationContext';

// Create a theme configuration
const theme = extendTheme({});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <RegistrationProvider>
        <Component {...pageProps} />
      </RegistrationProvider>
    </ChakraProvider>
  );
}

export default MyApp;