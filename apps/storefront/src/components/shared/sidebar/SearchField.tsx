import type { InputGroupProps } from "@chakra-ui/react";
import {
	InputGroup,
	InputLeftElement,
	Input,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchField = (props: InputGroupProps) => (
	<InputGroup {...props}>
		<InputLeftElement pointerEvents="none">
			<AiOutlineSearch opacity={0.82} />
		</InputLeftElement>
		<Input
			placeholder="Search"
			background={mode("gray.50", "gray.700")}
			focusBorderColor={mode("teal.500", "teal.300")}
			_placeholder={{ color: mode("black", "white") }}
		/>
	</InputGroup>
);

export default SearchField;
