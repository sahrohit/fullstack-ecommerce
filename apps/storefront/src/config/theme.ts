import { extendTheme, ColorMode } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";

interface IThemeMode {
	Light: ColorMode;
	Dark: ColorMode;
}

export const ThemeMode: IThemeMode = {
	Light: "light",
	Dark: "dark",
};

export const mobileBreakpointsMap = {
	base: true,
	md: true,
	lg: true,
	xl: false,
};

// Theme Config
const config = {
	initialColorMode: ThemeMode.Dark,
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	...proTheme,
});
export default theme;
