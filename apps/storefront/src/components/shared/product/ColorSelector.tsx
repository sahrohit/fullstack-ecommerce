import type { SquareProps, UseRadioProps, StackProps } from "@chakra-ui/react";
import {
	chakra,
	VStack,
	Circle,
	useColorModeValue as mode,
	useId,
	useRadio,
	useRadioGroup,
	FormLabel,
	Flex,
	Input,
	HStack,
} from "@chakra-ui/react";
import { BiCheck } from "react-icons/bi";

interface ColorSelectorProps {
	options: string[];
	onChange: (value: string) => void;
}

export const ColorSelector = ({ options, onChange }: ColorSelectorProps) => (
	<VStack mx="auto" maxW="5xl" width="full" alignItems="flex-start">
		<FormLabel>Color</FormLabel>
		<RadioGroup name="Colors" options={options} onChange={onChange} />
	</VStack>
);

interface RadioGroupProps extends Omit<StackProps, "onChange"> {
	name: string;
	options: string[];
	onChange: (value: string) => void;
}

const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, onChange, ...rest } = props;
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		onChange,
	});

	return (
		<HStack gap={1} flexWrap="wrap" {...getRootProps(rest)}>
			{options.map((value) => (
				<RadioOption key={value} {...getRadioProps({ value })}>
					{value}
				</RadioOption>
			))}
		</HStack>
	);
};

export interface RadioOptionProps
	extends UseRadioProps,
		Omit<SquareProps, "onChange"> {}

const RadioOption = (props: RadioOptionProps) => {
	const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
		useRadio(props);
	const id = useId();
	const color = getInputProps().value;
	const checkIconColor = mode("black", "white");

	return (
		<chakra.label {...htmlProps} cursor="pointer">
			<Input {...getInputProps()} hidden />
			<Flex
				{...getRadioProps()}
				borderColor={
					state.isChecked ? mode("gray.600", "gray.400") : mode("", "")
				}
				justifyContent="center"
				alignItems="center"
				borderWidth="1px"
				w={10}
				p={1}
				rounded="full"
			>
				<Circle
					id={id}
					bg={`${color}.400`}
					_hover={{
						bg: mode(`${color}.300`, `${color}.400`),
					}}
					fill={state.isChecked ? "green.500" : "gray.200"}
					transition="all 0.2s"
					cursor="pointer"
					rounded="full"
					size={8}
					{...getLabelProps()}
				>
					{state.isChecked && <BiCheck fill={checkIconColor} />}
				</Circle>
			</Flex>
		</chakra.label>
	);
};
