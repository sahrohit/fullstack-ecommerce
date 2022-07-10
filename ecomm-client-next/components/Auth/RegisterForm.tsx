import InputField from "@components/ui/InputField";
import { toErrorMap } from "@components/utils/toErrorMap";
import { useRegisterMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
	first_name: Yup.string().required("Required"),
	last_name: Yup.string().required("Required"),
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string()
		.min(6, "Too Short")
		.max(30, "Too Long")
		.required("Required"),
});

const RegisterForm: NextPage = () => {
	const [register] = useRegisterMutation();
	const router = useRouter();

	return (
		<Formik
			initialValues={{
				first_name: "",
				last_name: "",
				email: "",
				password: "",
			}}
			validationSchema={RegisterSchema}
			onSubmit={async (values, { setErrors }) => {
				const response = await register({
					variables: {
						options: {
							...values,
						},
					},
				});
				if (response.data?.register.errors) {
					setErrors(toErrorMap(response.data.register.errors));
				} else if (response.data?.register.user) {
					toast.success(
						() => (
							<div>
								<strong>Successfully Registered !</strong>
								<p>Verify you email to continue.</p>
							</div>
						),
						{ duration: 9000 }
					);
					router.push("/auth/login");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<InputField
								name="first_name"
								label="First Name"
								placeholder="First Name"
								type="text"
								autoComplete="first_name"
							/>
							<InputField
								name="last_name"
								label="Last Name"
								placeholder="Last Name"
								type="text"
								autoComplete="last_name"
							/>
						</div>

						<InputField
							name="email"
							label="Email"
							placeholder="Email"
							type="email"
							autoComplete="email"
						/>
						<InputField
							name="password"
							label="Password"
							placeholder="Password"
							type="password"
							autoComplete="current-password"
						/>

						<button
							className={`btn btn-primary w-full gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Register"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
