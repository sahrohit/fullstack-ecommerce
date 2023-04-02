import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import DarkModeSwitch from "@components/utils/DarkModeSwitch";
import { useApollo } from "@components/utils/withApollo";
import Footer from "@components/Footer";
import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps);

	const router = useRouter();

	const isAuthPage =
		router.pathname === "/auth/login" || router.pathname === "/auth/register";

	return (
		<ApolloProvider client={client}>
			<ThemeProvider enableSystem={true} attribute="data-theme">
				{!isAuthPage && <Navbar />}
				<Component {...pageProps} />
				{!isAuthPage && <Footer />}
				<div className="fixed bottom-4 right-4">
					<DarkModeSwitch />
				</div>
				<Toaster position="bottom-center" reverseOrder={false} />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
