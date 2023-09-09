import { Stack, useRadioGroup, UseRadioGroupProps } from "@chakra-ui/react";
import * as React from "react";
import LargeButtonRadio from "./LargeButtonRadio";

interface LargeButtonRadioGroupProps extends UseRadioGroupProps {
	options: Array<{
		label: string;
		value: string;
		description: string;
		icon: React.ReactElement;
	}>;
}

const LargeButtonRadioGroup = (props: LargeButtonRadioGroupProps) => {
	const { options, ...rest } = props;
	const { getRadioProps, getRootProps } = useRadioGroup(rest);
	return (
		<Stack
			justify="center"
			alignItems="baseline"
			direction={{ base: "column", md: "row" }}
			spacing="3"
			{...getRootProps()}
		>
			{options.map((option) => (
				<LargeButtonRadio
					key={option.value}
					icon={option.icon}
					description={option.description}
					label={option.label}
					{...getRadioProps({ value: option.value })}
				/>
			))}
		</Stack>
	);
};

export default LargeButtonRadioGroup;
