import {
	Stack,
	Flex,
	Circle,
	Text,
	useColorModeValue,
	Heading,
	StackProps,
} from "@chakra-ui/react";
import * as React from "react";

export interface ListItemProps extends StackProps {
	title: string;
	subTitle: string;
	icon?: React.ReactElement;
	isLastItem?: boolean;
}

const ListItem = (props: ListItemProps) => {
	const { title, subTitle, icon, isLastItem, children, ...stackProps } = props;

	return (
		<Stack as="li" direction="row" spacing="4" {...stackProps}>
			<Flex direction="column" alignItems="center" aria-hidden="true">
				<Circle
					bg={useColorModeValue("primary.500", "primary.300")}
					size="12"
					borderWidth="4px"
					borderColor={useColorModeValue("white", "gray.800")}
					color={useColorModeValue("white", "black")}
				>
					{icon}
				</Circle>
				{!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
			</Flex>
			<Stack spacing="4" flex="1">
				<Flex direction="column">
					<Heading fontSize="xl" fontWeight="semibold" lineHeight={2}>
						{title}
					</Heading>
					<Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
						{subTitle}
					</Text>
				</Flex>
				<Flex>{children}</Flex>
			</Stack>
		</Stack>
	);
};

ListItem.defaultProps = {
	icon: null,
	isLastItem: false,
};

export default ListItem;
