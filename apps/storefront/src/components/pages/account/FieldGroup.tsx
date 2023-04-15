import type { BoxProps } from "@chakra-ui/react";
import { Box, Text, useColorModeValue as mode } from "@chakra-ui/react";

interface FieldGroupProps extends BoxProps {
	title: string;
	description: string;
}

const FieldGroup = (props: FieldGroupProps) => {
	const { title, description, ...boxProps } = props;
	return (
		<Box>
			<Text as="h3" fontWeight="bold" fontSize="lg">
				{title}
			</Text>
			{description && (
				<Text color={mode("gray.600", "gray.300")} fontSize="sm">
					{description}
				</Text>
			)}

			<Box pt="5" {...boxProps} />
		</Box>
	);
};

export default FieldGroup;
