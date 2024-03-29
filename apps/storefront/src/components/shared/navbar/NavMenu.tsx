import { useColorModeValue } from "@chakra-ui/react";
import type { Variants } from "framer-motion";

import { forwardRef } from "react";
import type { MotionBoxProps } from "@/components/shared/navbar/MotionBox";
import { MotionBox } from "@/components/shared/navbar/MotionBox";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavMenu = forwardRef((props: MotionBoxProps, _ref) => (
	<MotionBox
		initial="init"
		variants={variants}
		outline="0"
		opacity="0"
		bg={useColorModeValue("white", "gray.700")}
		w="full"
		shadow="lg"
		px="4"
		pos="absolute"
		insetX="0"
		pt="6"
		pb="12"
		{...props}
	/>
));

const variants: Variants = {
	init: {
		opacity: 0,
		y: -4,
		display: "none",
		transition: { duration: 0 },
	},
	open: {
		opacity: 1,
		y: 0,
		display: "block",
		transition: { duration: 0.15 },
	},
	closed: {
		opacity: 0,
		y: -4,
		transition: { duration: 0.1 },
		transitionEnd: {
			display: "none",
		},
	},
};

export default NavMenu;
