import InputField from "@components/ui/InputField";
import { toErrorMap } from "@components/utils/toErrorMap";
import { useUpdatePasswordMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const UpdatePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string().required("Required"),
	newPassword: Yup.string().required("Required"),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("newPassword"), null],
		"Passwords must match"
	),
});

interface ChangePasswordFormProps {
	setChangePasswordModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordForm = ({
	setChangePasswordModalOpen,
}: ChangePasswordFormProps) => {
	const [updatePassword] = useUpdatePasswordMutation();

	return (
		<Formik
			validateOnBlur
			initialValues={{
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			}}
			validationSchema={UpdatePasswordSchema}
			onSubmit={async (values, actions) => {
				const response = await updatePassword({
					variables: {
						...values,
					},
				});

				if (response.data?.updatePassword.errors) {
					actions.setErrors(toErrorMap(response.data?.updatePassword.errors));
					toast.error(response.data?.updatePassword.errors[0].message);
				}

				if (response.data?.updatePassword.user) {
					actions.resetForm();
					if (typeof setChangePasswordModalOpen !== "undefined") {
						setChangePasswordModalOpen(false);
					}
					toast.success("Password updated successfully");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<InputField
						name="currentPassword"
						label="Current Password"
						placeholder="Current Password"
						type="password"
						autoComplete="current-password"
					/>
					<InputField
						name="newPassword"
						label="New Password"
						placeholder="New Password"
						type="password"
						autoComplete="new-password"
					/>
					<InputField
						name="confirmPassword"
						label="Confirm Password"
						placeholder="Confirm New Password"
						type="password"
						autoComplete="confirm-password"
					/>

					<div className="flex justify-end mt-4 space-x-4">
						<button
							className={`btn btn-secondary btn-sm gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Update"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ChangePasswordForm;
