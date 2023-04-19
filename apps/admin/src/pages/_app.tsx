import theme from "@/config/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = ({ Component, pageProps }: AppProps) => {
	const client = new ApolloClient({
		uri: "http://localhost:4000/graphql",
		cache: new InMemoryCache(),
	});

	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</ChakraProvider>
	);
};

export default App;
