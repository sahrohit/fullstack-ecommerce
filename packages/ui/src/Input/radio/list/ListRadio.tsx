/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	Box,
	HStack,
	Text,
	useColorModeValue as mode,
	useId,
	UseRadioProps,
	useRadio,
} from "@chakra-ui/react";
import * as React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { ListRadioBox } from "./ListRadioBox";

export interface ListRadioProps extends UseRadioProps {
	icon: React.ReactElement;
	title: string;
	description: string;
	anotherDescription?: string;
	price: string;
	children: React.ReactNode;
}

export const ListRadio = (props: ListRadioProps) => {
	const { icon, title, description, price, anotherDescription, ...rest } =
		props;
	const { getRadioProps, getInputProps, getLabelProps, state } = useRadio(rest);
	const id = useId();

	return (
		<label {...getLabelProps()}>
			<input {...getInputProps()} aria-labelledby={id} />
			<ListRadioBox {...getRadioProps()} id={id}>
				<HStack spacing="4">
					<Box
						data-checked={state.isChecked ? "" : undefined}
						fontSize="2xl"
						_checked={{
							color: mode("primary.500", "primary.300"),
						}}
						color={mode("gray.300", "whiteAlpha.400")}
					>
						{state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
					</Box>
					<Box fontSize="3xl">{icon}</Box>
					<Box flex="1">
						<Text fontWeight="bold">{title}</Text>
						<Text fontSize="sm">
							{description}, {anotherDescription}
						</Text>
						{/* {anotherDescription && (
							<Text fontSize="sm">{anotherDescription}</Text>
						)} */}
					</Box>
					<Box fontWeight="bold" color={mode("primary.600", "primary.400")}>
						{price}
					</Box>
				</HStack>
			</ListRadioBox>
		</label>
	);
};

ListRadio.defaultProps = {
	anotherDescription: null,
};
