import SidebarLayout from "@/components/shared/sidebar";
import theme from "@/config/theme";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();

	return (
		<ChakraProvider theme={theme}>
			{router.pathname.startsWith("/account") ? (
				<SidebarLayout>
					<Component {...pageProps} />
				</SidebarLayout>
			) : (
				<Component {...pageProps} />
			)}
		</ChakraProvider>
	);
};

export default App;
