import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import theme from "@/config/theme";
import SidebarLayout from "@/components/shared/sidebar";
import "@uploadthing/react/styles.css";

export const client = new ApolloClient({
	uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
	cache: new InMemoryCache(),
	credentials: "include",
});
const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				{router.pathname.startsWith("/dashboard") ? (
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
