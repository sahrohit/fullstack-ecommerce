import type { BoxProps } from "@chakra-ui/react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Card = (props: BoxProps) => (
	<Box
		bg={useColorModeValue("white", "gray.700")}
		shadow="base"
		rounded="lg"
		p={{ base: "4", md: "8" }}
		{...props}
	/>
);

export default Card;
