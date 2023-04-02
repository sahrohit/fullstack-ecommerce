import { extendTheme, ColorMode } from "@chakra-ui/react";

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
});
export default theme;
