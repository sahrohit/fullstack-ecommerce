import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import InputField from "@components/ui/InputField";
import { useForgotPasswordMutation } from "@generated/graphql";

const ForgotPasswordPage = () => {
	const [forgotPassword] = useForgotPasswordMutation();
	const [emailSent, setEmailSent] = useState(false);
	const router = useRouter();

	return (
		<Formik
			initialValues={{ email: "" }}
			onSubmit={async (values) => {
				const response = await forgotPassword({
					variables: {
						...values,
					},
				});
				setEmailSent(response.data?.forgotPassword || false);
				if (response.data?.forgotPassword) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="h-screen w-full grid place-items-center">
					<div className="w-full flex flex-col gap-2 max-w-sm">
						<div>
							<h1 className="text-3xl font-bold py-1 ">
								Reset your password here
							</h1>
						</div>
						<InputField
							name="email"
							label="Email"
							placeholder="Email"
							type="email"
							autoComplete="email"
						/>

						<button
							className={`btn btn-primary w-full gap-2 rounded-md ${
								isSubmitting && "loading"
							} ${emailSent && "btn-disabled text-green-700"} `}
							type="submit"
						>
							{emailSent && <BsCheck transform="scale(2)" fill="green" />}
							{isSubmitting
								? "Loading"
								: !emailSent
								? "Send Verification Link"
								: "Verification Link Sent"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ForgotPasswordPage;
