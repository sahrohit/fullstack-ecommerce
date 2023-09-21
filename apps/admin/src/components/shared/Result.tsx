import {
	Box,
	Heading,
	Icon,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiFillInfoCircle, AiFillWarning } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";

interface ResultProps {
	type: "success" | "error" | "info" | "warn";
	heading: string;
	text: string;
	dump?: any;
	children?: ReactNode;
}

const Result = ({ type, heading, text, dump, children }: ResultProps) => {
	const backgroundColor = useColorModeValue("gray.100", "gray.700");

	const ICON = {
		success: BsCheckCircleFill,
		error: MdError,
		info: AiFillInfoCircle,
		warn: AiFillWarning,
	};

	const COLOR = {
		success: "green.500",
		error: "red.500",
		info: "blue.500",
		warn: "yellow.500",
	};

	return (
		<VStack
			textAlign="center"
			py={10}
			px={6}
			// h="100vh"
			justifyContent="center"
			alignContent="center"
		>
			<Icon as={ICON[type]} boxSize="60px" color={COLOR[type]} />
			{heading && (
				<Heading as="h2" size="xl" mt={4} mb={2}>
					{heading}
				</Heading>
			)}
			{text && <Text color="gray.500">{text}</Text>}
			<Box py={4}>{children}</Box>
			{dump && (
				<Box
					p={2}
					bg={backgroundColor}
					w="full"
					flexGrow={1}
					overflowY="scroll"
					textAlign="left"
				>
					<Text as="pre" whiteSpace="pre-line">
						{JSON.stringify(dump, null, 4)}
					</Text>
				</Box>
			)}
		</VStack>
	);
};

Result.defaultProps = {
	dump: null,
	children: null,
};

export default Result;
