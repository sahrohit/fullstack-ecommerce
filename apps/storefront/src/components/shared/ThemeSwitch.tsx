import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
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
