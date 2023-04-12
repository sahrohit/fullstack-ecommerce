import { Button, Fade, IconButton, useColorMode } from "@chakra-ui/react";

import { BsMoon, BsSun } from "react-icons/bs";

const ThemeSwitch = () => {
	const { colorMode, setColorMode } = useColorMode();

	return (
		<IconButton
			aria-label="Theme Switch"
			onClick={() => {
				setColorMode(colorMode === "light" ? "dark" : "light");
			}}
			icon={colorMode === "light" ? <BsMoon /> : <BsSun />}
		/>
	);
};

export default ThemeSwitch;

export const ThemeSwitchButton = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Fade in>
			<Button
				w="full"
				justifyContent="center"
				aria-label="Theme Switch"
				onClick={toggleColorMode}
				leftIcon={colorMode === "light" ? <BsMoon /> : <BsSun />}
			>
				{colorMode === "light" ? "Go Dark " : "Go Light "}
			</Button>
		</Fade>
	);
};
