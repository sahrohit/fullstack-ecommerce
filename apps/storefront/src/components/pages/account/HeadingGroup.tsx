import type { StackProps } from "@chakra-ui/react";
import { Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

interface HeadingGroupProps extends StackProps {
	title: string;
	description: string;
}

const HeadingGroup = (props: HeadingGroupProps) => {
	const { title, description, ...stackProps } = props;
	return (
		<Stack spacing="1" {...stackProps}>
			<Heading size="md" fontWeight="semibold">
				{title}
			</Heading>
			<Text color={useColorModeValue("gray.600", "gray.400")}>
				{description}
			</Text>
		</Stack>
	);
};

export default HeadingGroup;
