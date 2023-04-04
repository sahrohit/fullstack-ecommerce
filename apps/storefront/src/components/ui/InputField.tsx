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

type InputFieldProps = Omit<BoxProps, "apply"> &
	Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
		size?: "lg" | "md" | "sm" | "xs";
		register: UseFormRegisterReturn<any>;
		required?: boolean;
		name: string;
		label: string;
		placeholder: string;
		autoComplete?: string;
		disabled?: boolean;
		error: FieldError | undefined;
		isDirty: boolean | undefined;
		showErrorMessage?: boolean;
		showLabel?: boolean;
	};

const InputField = (props: InputFieldProps) => {
	const { error, isDirty, showErrorMessage, showLabel, ...rest } = props;

	return (
		<>
			<FormControl id={props.name} isInvalid={!!error && isDirty}>
				<HStack justifyContent={"space-between"}>
					<FormLabel srOnly={showLabel ? undefined : true}>
						{props.label}
					</FormLabel>
					{showErrorMessage && (
						<FormErrorMessage>{error?.message}</FormErrorMessage>
					)}
				</HStack>
				<Input
					autoComplete={props.autoComplete}
					required={props.required}
					{...props.register}
					{...rest}
				/>
			</FormControl>
		</>
	);
};

InputField.defaultProps = {
	required: false,
	disabled: false,
	showErrorMessage: true,
	showLabel: true,
};

export default InputField;
