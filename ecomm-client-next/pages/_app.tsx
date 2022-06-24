import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import DarkModeSwitch from "../components/utils/DarkModeSwitch";
import { useApollo } from "../components/utils/withApollo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps);

	return (
		<ApolloProvider client={client}>
			<ThemeProvider enableSystem={true} attribute="data-theme">
				<Component {...pageProps} />
				<div className="fixed bottom-4 right-4">
					<DarkModeSwitch />
				</div>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
