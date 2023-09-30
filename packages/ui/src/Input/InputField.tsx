import { InputHTMLAttributes } from "react";
import {
	BoxProps,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type InputFieldProps = Omit<BoxProps, "apply"> &
	Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
		size?: "lg" | "md" | "sm" | "xs";
		register: UseFormRegisterReturn<any>;
		required?: boolean;
		name: string;
		label: string;
		placeholder: string;
		disabled?: boolean;
		error: FieldError | undefined;
		touched: boolean | undefined;
		showErrorMessage?: boolean;
		showLabel?: boolean;
	};

export const InputField = (props: InputFieldProps) => {
	const {
		error,
		touched,
		showErrorMessage,
		showLabel,
		name,
		label,
		autoComplete,
		required,
		register,
		...rest
	} = props;

	return (
		<FormControl id={name} isInvalid={!!error && touched}>
			<HStack justifyContent="space-between">
				<FormLabel srOnly={showLabel ? undefined : true}>{label}</FormLabel>
				<FormErrorMessage>
					{showErrorMessage && error?.message}
				</FormErrorMessage>
			</HStack>
			<Input
				autoComplete={autoComplete}
				required={required}
				{...register}
				{...rest}
			/>
		</FormControl>
	);
};

InputField.defaultProps = {
	required: false,
	disabled: false,
	showErrorMessage: true,
	showLabel: true,
	size: "md",
};
