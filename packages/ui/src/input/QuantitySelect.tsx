import {
	useNumberInput,
	IconButton,
	Input,
	UseNumberInputProps,
	InputGroup,
	InputRightElement,
	InputLeftElement,
	ResponsiveValue,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface QuantitySelectProps extends UseNumberInputProps {
	maxW?: string;
	size?: ResponsiveValue<"md" | (string & {}) | "lg" | "sm" | "xs"> | undefined;
}

export const QuantitySelect = (props: QuantitySelectProps) => {
	const { maxW, size, ...rest } = props;

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			min: 1,
			max: 6,
			...rest,
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<InputGroup size={size} maxW={maxW}>
			<InputLeftElement>
				<IconButton aria-label="Decreament Cart" size="sm" {...dec}>
					<AiOutlineMinus size="20" />
				</IconButton>
			</InputLeftElement>

			<Input bg="transparent" textAlign="center" {...input} />
			<InputRightElement>
				<IconButton aria-label="Increament Cart" size="sm" {...inc}>
					<AiOutlinePlus size="20" />
				</IconButton>
			</InputRightElement>
		</InputGroup>
	);
};

QuantitySelect.defaultProps = {
	maxW: "null",
	size: "lg",
};

export default QuantitySelect;
