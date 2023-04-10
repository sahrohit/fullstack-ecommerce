import type { SquareProps, UseRadioProps, StackProps } from "@chakra-ui/react";
import {
	VStack,
	Square,
	useColorModeValue as mode,
	useId,
	useRadio,
	useRadioGroup,
	SimpleGrid,
	Input,
	chakra,
	FormLabel,
} from "@chakra-ui/react";

export const SizeSelector = () => {
	const options = ["38", "40", "42", "44"];

	return (
		<VStack mx="auto" maxW="5xl" width="full" alignItems={"flex-start"}>
			<FormLabel>Sizes</FormLabel>
			<RadioGroup
				name="Sizes"
				options={options}
				onChange={(value) => {
					console.log(value);
				}}
			/>
		</VStack>
	);
};

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
		<SimpleGrid
			columns={{ base: 3, lg: 4 }}
			spacing={{ base: 2, md: 4 }}
			{...getRootProps(rest)}
		>
			{options.map((value) => (
				<RadioOption key={value} {...getRadioProps({ value })}>
					{value}
				</RadioOption>
			))}
		</SimpleGrid>
	);
};

export interface RadioOptionProps
	extends UseRadioProps,
		Omit<SquareProps, "onChange"> {}

const RadioOption = (props: RadioOptionProps) => {
	const id = useId();
	const { getInputProps, getRadioProps, htmlProps } = useRadio(props);

	const { isChecked, ...rest } = getRadioProps(props);

	return (
		<chakra.label {...htmlProps}>
			<Input {...getInputProps()} aria-labelledby={id} />
			<Square
				id={id}
				rounded="md"
				fontWeight="semibold"
				size={{ base: "8", md: "10" }}
				borderWidth="1px"
				transition="all 0.2s"
				cursor="pointer"
				_hover={{
					bg: mode("gray.100", "whiteAlpha.200"),
				}}
				_active={{
					bg: mode("gray.200", "whiteAlpha.300"),
				}}
				_checked={{
					bg: mode("blue.100", "blue.300"),
					borderColor: mode("blue.500", "blue.300"),
				}}
				{...rest}
			/>
		</chakra.label>
	);
};
