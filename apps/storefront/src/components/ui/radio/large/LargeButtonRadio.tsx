/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	Box,
	chakra,
	Text,
	useRadio,
	UseRadioProps,
	VStack,
	useColorModeValue as mode,
	useId,
} from "@chakra-ui/react";
import * as React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const RadioBox = chakra("div", {
	baseStyle: {
		borderWidth: "3px",
		px: { base: 3, lg: 6 },
		pt: { base: 6, lg: 12 },
		pb: { base: 4, lg: 8 },
		borderRadius: "md",
		cursor: "pointer",
		transition: "all 0.2s",
		_focus: { shadow: "outline" },
	},
});

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
	<Box
		fontSize="4xl"
		color={checked ? "blue.600" : mode("gray.300", "whiteAlpha.400")}
	>
		{checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
	</Box>
);

interface LargeButtonRadioProps extends UseRadioProps {
	icon: React.ReactElement;
	label: string;
	description: string;
}

const LargeButtonRadio = (props: LargeButtonRadioProps) => {
	const { label, icon, description } = props;
	const { getCheckboxProps, getInputProps, getLabelProps, state } =
		useRadio(props);
	const id = useId();

	const checkedStyles = {
		bg: mode("blue.50", "rgb(0 31 71)"),
		borderColor: "blue.600",
	};

	return (
		<label style={{ width: "100%" }} {...getLabelProps()}>
			<input {...getInputProps()} aria-labelledby={id} />
			<RadioBox {...getCheckboxProps()} _checked={checkedStyles} id={id}>
				<VStack spacing="4">
					<VStack textAlign="center">
						<Box
							aria-hidden
							fontSize="4xl"
							mb="3"
							color={state.isChecked ? "blue.600" : undefined}
						>
							{icon}
						</Box>
						<Text fontWeight="extrabold" fontSize="xl">
							{label}
						</Text>
						<Text fontSize="sm">{description}</Text>
					</VStack>
					<CheckboxIcon checked={state.isChecked} />
				</VStack>
			</RadioBox>
		</label>
	);
};

export default LargeButtonRadio;
