import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
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
		type?: HTMLInputTypeAttribute;
		autoComplete?: string;
		disabled?: boolean;
		error: FieldError | undefined;
		isDirty: boolean | undefined;
		showErrorMessage?: boolean;
	};

const InputField = (props: InputFieldProps) => {
	const { error, isDirty, showErrorMessage, ...rest } = props;

	return (
		<>
			<FormControl id={props.name} isInvalid={!!error && isDirty}>
				<HStack justifyContent={"space-between"}>
					<FormLabel srOnly>{props.label}</FormLabel>
					{showErrorMessage && (
						<FormErrorMessage>{error?.message}</FormErrorMessage>
					)}
				</HStack>
				<Input
					type={props.type}
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
};

export default InputField;
