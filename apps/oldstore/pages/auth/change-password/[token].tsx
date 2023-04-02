import InputField from "@components/ui/InputField";
import { useChangePasswordMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ChangePasswordPage = () => {
	const router = useRouter();
	const { token } = router.query;
	const [error, setError] = useState("");

	const [changePassword] = useChangePasswordMutation();

	return (
		<Formik
			initialValues={{ password: "", confirm_password: "" }}
			onSubmit={async (values, { setErrors }) => {
				if (values.password !== values.confirm_password) {
					setErrors({ confirm_password: "Passwords do not match" });
					return;
				}
				const response = await changePassword({
					variables: {
						newPassword: values.password,
						token: token as string,
					},
				});
				if (response.data?.changePassword.errors) {
					setError(response.data.changePassword.errors[0].message);
				}
				if (response.data?.changePassword.user) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="h-screen w-full grid place-items-center">
					<div className="w-full flex flex-col gap-2 max-w-sm">
						<div>
							<h1 className="text-3xl font-bold py-1 ">Set New Password</h1>
							<p>Make sure to save your password.</p>
						</div>
						<InputField
							name="password"
							label="Password"
							placeholder="Password"
							type="password"
							autoComplete="new-password"
						/>{" "}
						<InputField
							name="confirm_password"
							label="Confirm Password"
							placeholder="Confirm Password"
							type="password"
							autoComplete="new-password"
						/>
						{error && (
							<p className="text-red-500">
								{error}.{" "}
								<Link
									href="/auth/forgot-password"
									className="link link-error link-hover"
									passHref
								>
									Regenerate Link?
								</Link>
							</p>
						)}
						<button
							className={`btn btn-primary w-full gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Confirm"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ChangePasswordPage;
