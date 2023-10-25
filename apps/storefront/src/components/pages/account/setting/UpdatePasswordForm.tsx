import { Button, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useUpdatePasswordMutation } from "generated-graphql";
import { InputField } from "ui";

type UpdatePasswordFormValues = {
	currentpassword: string;
	newpassword: string;
	confirmnewpassword: string;
};

const UpdatePasswordFormSchema = Yup.object({
	currentpassword: Yup.string().required("Required"),
	newpassword: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
	confirmnewpassword: Yup.string().oneOf(
		[Yup.ref("newpassword"), null],
		"Passwords must match"
	),
});

interface UpdatePasswordFormProps {
	onSubmissionSuccess?: () => void;
}

const UpdatePasswordForm = ({
	onSubmissionSuccess: closeModal,
}: UpdatePasswordFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<UpdatePasswordFormValues>({
		defaultValues: {
			currentpassword: "",
			newpassword: "",
			confirmnewpassword: "",
		},
		resolver: yupResolver(UpdatePasswordFormSchema),
	});
	const toast = useToast();
	const [updatePasswordMutation] = useUpdatePasswordMutation();

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				const response = await updatePasswordMutation({
					variables: {
						currentPassword: values.currentpassword,
						newPassword: values.newpassword,
						confirmPassword: values.confirmnewpassword,
					},
				});
				if (response.data?.updatePassword.errors) {
					toast({
						title: "An error occurred.",
						description: response.data?.updatePassword.errors[0].message,
						status: "error",
						duration: 4000,
						isClosable: true,
					});
				}

				if (response.data?.updatePassword.user) {
					toast({
						title: "Your password has been changed.",
						description: "Logging you back in.",
						status: "success",
						duration: 4000,
						isClosable: true,
					});
					if (closeModal) {
						closeModal();
					}
				}
			})}
		>
			<Stack spacing="4">
				<InputField
					register={{ ...register("currentpassword") }}
					error={errors.currentpassword}
					touched={touchedFields.currentpassword}
					type="password"
					name="currentpassword"
					size="lg"
					autoComplete="current-password"
					label="Current Password"
					placeholder=""
				/>
				<InputField
					register={{ ...register("newpassword") }}
					error={errors.newpassword}
					touched={touchedFields.newpassword}
					type="password"
					name="newpassword"
					size="lg"
					autoComplete="new-password"
					label="New Password"
					placeholder=""
				/>
				<InputField
					register={{ ...register("confirmnewpassword") }}
					error={errors.confirmnewpassword}
					touched={touchedFields.confirmnewpassword}
					type="password"
					name="confirmnewpassword"
					size="lg"
					autoComplete="confirm-new-password"
					label="Confirm Password"
					placeholder=""
				/>

				<Button
					type="submit"
					colorScheme="primary"
					size="lg"
					fontSize="md"
					isLoading={isSubmitting}
				>
					Update Password
				</Button>
			</Stack>
		</form>
	);
};

UpdatePasswordForm.defaultProps = {
	onSubmissionSuccess: () => {},
};

export default UpdatePasswordForm;
