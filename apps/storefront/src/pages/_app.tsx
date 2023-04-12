import theme from "@/config/theme";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
	<ChakraProvider theme={theme}>
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
