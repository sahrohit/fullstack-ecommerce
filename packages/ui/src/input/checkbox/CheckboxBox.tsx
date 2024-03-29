import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

const CheckboxBox = (props: BoxProps) => (
	<Box
		borderWidth="2px"
		px="4"
		py="3"
		borderRadius="md"
		cursor="pointer"
		transition="all 0.2s"
		_focus={{ shadow: "outline" }}
		_checked={{
			bg: useColorModeValue("gray.50", "whiteAlpha.100"),
			borderColor: useColorModeValue("primary.500", "primary.300"),
		}}
		{...props}
	/>
);

export default CheckboxBox;
