import type { SquareProps, UseRadioProps, StackProps } from "@chakra-ui/react";
import {
	VStack,
	Square,
	useColorModeValue as mode,
	useId,
	useRadio,
	useRadioGroup,
	Input,
	chakra,
	FormLabel,
	SimpleGrid,
	HStack,
} from "@chakra-ui/react";
import { UnderlineLink } from "ui";

interface VariantSelectorProps {
	options: string[];
	variantName: string;
	onChange: (value: string) => void;
	defaultValue: string | number;
	value: string | number;
}

export const VariantSelector = ({
	options,
	variantName,
	onChange,
	defaultValue,
	value,
}: VariantSelectorProps) => (
	<VStack mx="auto" maxW="5xl" width="full" alignItems="flex-start">
		<HStack justifyContent="space-between" w="full" alignItems="flex-start">
			<FormLabel>{variantName}</FormLabel>
			<UnderlineLink fontSize="xs" href="/">
				See Size Guides
			</UnderlineLink>
		</HStack>
		<RadioGroup
			name="Sizes"
			options={options}
			onChange={onChange}
			defaultValue={defaultValue}
			value={value}
		/>
	</VStack>
);

interface RadioGroupProps extends Omit<StackProps, "onChange"> {
	name: string;
	options: string[];
	onChange: (value: string) => void;
	defaultValue: string | number;
	value: string | number;
}

const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, onChange, defaultValue, value, ...rest } = props;
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		onChange,
		defaultValue: defaultValue as string,
		value: value as string,
	});

	return (
		<SimpleGrid
			minChildWidth={{ base: "16", md: "12" }}
			spacing={{ base: 2, md: 4 }}
			w="full"
			{...getRootProps(rest)}
		>
			{options.map((option) => (
				<RadioOption key={option} {...getRadioProps({ value: option })}>
					{option}
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
				p={2}
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
					bg: mode("primary.100", "primary.300"),
					borderColor: mode("primary.500", "primary.300"),
				}}
				_disabled={{
					cursor: "not-allowed",
					opacity: 0.4,
				}}
				{...rest}
			/>
		</chakra.label>
	);
};
