import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import IconButton from "../ui/IconButton";

const DarkModeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const { theme, setTheme } = useTheme();

	if (!mounted) return null;

	return (
		<IconButton
			icon={theme === "light" ? <BsSun /> : <BsMoon />}
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		/>
	);
};

export default DarkModeSwitch;
