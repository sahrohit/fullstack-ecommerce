import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import theme from "@/config/theme";
import SidebarLayout from "@/components/shared/sidebar";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	const client = new ApolloClient({
		uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		cache: new InMemoryCache({
			// ! Pagination is working, but filtering stops working after this
			// typePolicies: {
			// 	Query: {
			// 		fields: {
			// 			queryProducts: {
			// 				keyArgs: [],
			// 				merge(
			// 					existing: PaginatedProducts | undefined,
			// 					incomming: PaginatedProducts
			// 				): PaginatedProducts {
			// 					return {
			// 						...incomming,
			// 						products: [
			// 							...(existing?.products || []),
			// 							...incomming.products,
			// 						],
			// 					};
			// 				},
			// 			},
			// 		},
			// 	},
			// },
		}),
		credentials: "include",
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
