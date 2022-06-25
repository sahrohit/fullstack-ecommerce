import { useTheme } from "next-themes";
import { __light_theme__ } from "../../constants";

const useColorModeValue = (lightModeValue: string, darkModeValue: string) => {
	const { theme } = useTheme();
	return theme === __light_theme__ ? lightModeValue : darkModeValue;
};

export default useColorModeValue;
