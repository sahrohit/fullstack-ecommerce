import SidebarLayout from "@/components/shared/sidebar";
import theme from "@/config/theme";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	const client = new ApolloClient({
		uri: "http://localhost:4000/graphql",
		cache: new InMemoryCache(),
	});

	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				{router.pathname.startsWith("/account") ? (
					<SidebarLayout>
						<Component {...pageProps} />
					</SidebarLayout>
				) : (
					<Component {...pageProps} />
				)}
			</ApolloProvider>
		</ChakraProvider>
	);
};

export default App;
