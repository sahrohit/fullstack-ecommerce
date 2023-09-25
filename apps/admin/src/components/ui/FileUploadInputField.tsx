import { InputHTMLAttributes } from "react";
import {
	BoxProps,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	type IconButtonProps,
	useToast,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { type UploadFileResponse } from "uploadthing/client";
import { UploadButton } from "@/utils/uploadthing";

type FileUploadInputFieldProps = Omit<BoxProps, "apply"> &
	Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
		size?: "lg" | "md" | "sm" | "xs";
		name: string;
		label: string;
		error: FieldError | undefined;
		showErrorMessage?: boolean;
		showLabel?: boolean;
		value: string;
		onUploadComplete: (res: UploadFileResponse[] | undefined) => void;
		onResetField: () => void;
		resetIconProps?: IconButtonProps;
	};

const FileUploadInputField = (props: FileUploadInputFieldProps) => {
	const toast = useToast();

	const {
		error,
		showErrorMessage,
		showLabel,
		name,
		label,
		value,
		onUploadComplete,
		onResetField,
		resetIconProps,
	} = props;

	return (
		<FormControl id={name} isInvalid={!!error}>
			<HStack justifyContent="space-between">
				<FormLabel srOnly={showLabel ? undefined : true}>{label}</FormLabel>
				<FormErrorMessage>
					{showErrorMessage && error?.message}
				</FormErrorMessage>
			</HStack>
			{value ? (
				<HStack position="relative" justifyContent="center">
					<Image src={value} width="200" height="200" alt="Pan/VAT Document" />
					<IconButton
						colorScheme="red"
						size="sm"
						position="absolute"
						top={2}
						right={2}
						icon={<AiOutlineClose size="18" />}
						aria-label="Delete Image"
						onClick={onResetField}
						{...resetIconProps}
					/>
				</HStack>
			) : (
				<UploadButton
					endpoint="kycDocumentUploader"
					onClientUploadComplete={onUploadComplete}
					onUploadError={(uploadError: Error) => {
						toast({
							title: "KYC Document Upload Failed",
							description: uploadError.message,
							status: "error",
							duration: 5000,
							isClosable: true,
						});
					}}
				/>
			)}
		</FormControl>
	);
};

FileUploadInputField.defaultProps = {
	showErrorMessage: true,
	showLabel: true,
	size: "md",
	resetIconProps: {},
};

export default FileUploadInputField;
