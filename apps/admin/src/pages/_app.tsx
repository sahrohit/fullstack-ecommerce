import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import theme from "@/config/theme";
import SidebarLayout from "@/components/shared/sidebar";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	const client = new ApolloClient({
		uri: "http://localhost:4000/graphql",
		cache: new InMemoryCache(),
		credentials: "include",
	});

	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				{!router.pathname.startsWith("/auth") ? (
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
