import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "@/config/theme";

const Document = () => (
	<Html lang="en">
		<Head>
			<meta name="description" content="Generated by create next app" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<body>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Main />
			<NextScript />
		</body>
	</Html>
);
export default Document;
