import type { StackProps } from "@chakra-ui/react";
import {
	Divider,
	HStack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";

export const DividerWithText = (props: StackProps) => {
	const { children, ...rest } = props;

	return (
		<HStack my="4" {...rest}>
			<Divider />
			<Text
				px="3"
				textTransform="uppercase"
				fontSize="sm"
				fontWeight="semibold"
				color={mode("gray.600", "gray.200")}
			>
				{children}
			</Text>
			<Divider />
		</HStack>
	);
};
