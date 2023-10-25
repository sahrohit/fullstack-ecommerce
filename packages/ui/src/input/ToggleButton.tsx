import type {
	IconButtonProps,
	UseRadioProps,
	ButtonGroupProps,
} from "@chakra-ui/react";
import {
	Box,
	IconButton,
	useColorModeValue,
	useId,
	useRadio,
	ButtonGroup,
	useRadioGroup,
} from "@chakra-ui/react";

import type { ReactElement } from "react";
import { useMemo, Children, isValidElement, cloneElement } from "react";

export interface ToggleButtonProps extends IconButtonProps {
	value: string;
	radioProps?: UseRadioProps;
}

export const ToggleButton = (props: ToggleButtonProps) => {
	const { radioProps, ...rest } = props;
	const { htmlProps, getInputProps, getRadioProps, getLabelProps } =
		useRadio(radioProps);
	const id = useId(undefined, "toggle-button");

	return (
		<Box as="label" cursor="pointer" {...getLabelProps()} {...htmlProps}>
			<input {...getInputProps()} aria-labelledby={id} />
			<IconButton
				as="div"
				id={id}
				color={useColorModeValue("gray.600	", "whiteAlpha.700")}
				_checked={{
					color: useColorModeValue("primary", "whiteAlpha.900"),
					bg: useColorModeValue("gray.200", "whiteAlpha.300"),
				}}
				{...getRadioProps()}
				{...rest}
			/>
		</Box>
	);
};

ToggleButton.defaultProps = {
	radioProps: {},
};

export interface ToggleButtonGroupProps<T>
	extends Omit<ButtonGroupProps, "onChange"> {
	name?: string;
	defaultValue?: string;
	onChange?: (value: T) => void;
}

export const ToggleButtonGroup = <T extends string>(
	props: ToggleButtonGroupProps<T>
) => {
	const { children, name, defaultValue, onChange, isDisabled, ...rest } = props;
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		defaultValue,
		onChange,
	});

	const buttons = useMemo(
		() =>
			Children.toArray(children)
				.filter<ReactElement<ToggleButtonProps>>(isValidElement)
				.map((button, index, array) => {
					const isFirstItem = index === 0;
					const isLastItem = array.length === index + 1;

					const styleProps = {
						...(isFirstItem && !isLastItem ? { borderRightRadius: 0 } : {}),
						...(!isFirstItem && isLastItem ? { borderLeftRadius: 0 } : {}),
						...(!isFirstItem && !isLastItem ? { borderRadius: 0 } : {}),
						...(!isLastItem ? { mr: "-px" } : {}),
					};

					return cloneElement(button, {
						...styleProps,
						radioProps: getRadioProps({
							value: button.props.value,
							disabled: isDisabled || button.props.isDisabled,
						}),
					});
				}),
		[children, getRadioProps, isDisabled]
	);
	return <ButtonGroup {...getRootProps(rest)}>{buttons}</ButtonGroup>;
};

ToggleButtonGroup.defaultProps = {
	name: null,
	defaultValue: null,
	onChange: () => {},
};
