import { extendTheme, ColorMode } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";

const colors = {
	primary: {
		"50": "#83baba",
		"100": "#6aacac",
		"200": "#519e9e",
		"300": "#399090",
		"400": "#208282",
		"500": "#077474",
		"600": "#066868",
		"700": "#065d5d",
		"800": "#055151",
		"900": "#044646",
	},
	secondary: {
		"50": "#a19bbf",
		"100": "#8e87b2",
		"200": "#7b73a5",
		"300": "#685f98",
		"400": "#554b8b",
		"500": "#42377e",
		"600": "#3b3271",
		"700": "#352c65",
		"800": "#2e2758",
		"900": "#28214c",
	},
	ternary: {
		"50": "#dfdfdf",
		"100": "#d9d9d9",
		"200": "#d2d2d2",
		"300": "#cccccc",
		"400": "#c5c5c5",
		"500": "#bfbfbf",
		"600": "#acacac",
		"700": "#999999",
		"800": "#868686",
		"900": "#737373",
	},
};

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
	initialColorMode: ThemeMode.Light,
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	colors,
	...proTheme,
	styles: {
		global: {
			body: {
				transitionProperty: "all",
				transitionDuration: "normal",
			},
		},
	},
});
export default theme;
