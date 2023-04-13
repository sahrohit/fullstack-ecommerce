import {
	useNumberInput,
	HStack,
	IconButton,
	Input,
	UseNumberInputProps,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const QuantitySelect = (props: UseNumberInputProps) => {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			min: 0,
			max: 6,
			...props,
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<HStack
			maxW="180px"
			gap={6}
			borderColor="chakra-border-color"
			borderWidth="1px"
			p={1}
			px={2}
			borderRadius="md"
		>
			<IconButton aria-label="Decreament Cart" size="sm" m={1} {...dec}>
				<AiOutlineMinus size="20" />
			</IconButton>
			<Input
				fontWeight="semibold"
				textAlign="center"
				variant="unstyled"
				flexGrow={0}
				{...input}
			/>

			<IconButton aria-label="Increament Cart" size="sm" m={1} {...inc}>
				<AiOutlinePlus size="20" />
			</IconButton>
		</HStack>
	);
};

export default QuantitySelect;
