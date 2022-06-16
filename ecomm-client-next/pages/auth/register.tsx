import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MdMailOutline, MdOutlinePassword } from "react-icons/md";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { toErrorMap } from "../../components/utils/toErrorMap";
import { useRegisterMutation } from "../../generated/graphql";

const RegisterPage: NextPage = () => {
	const router = useRouter();

	const [register] = useRegisterMutation();

	return (
		<div className="grid place-items-center h-screen">
			<Formik
				initialValues={{
					email: "",
					password: "",
					username: "",
					first_name: "",
					last_name: "",
					phone_number: "",
				}}
				onSubmit={async (values, { setErrors }) => {
					const response = await register({
						variables: {
							options: {
								email: values.email,
								username: values.username,
								password: values.password,
								first_name: values.first_name,
								last_name: values.last_name,
								phone_number: values.phone_number,
							},
						},
					});
					if (response.data?.register.errors) {
						console.log(toErrorMap(response.data.register.errors));
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="grid grid-cols-2 gap-x-8">
							<InputField
								icon={<MdMailOutline />}
								name="username"
								label="Username"
								placeholder="Username"
								type="text"
								autoComplete="username"
							/>
							<InputField
								icon={<MdOutlinePassword />}
								name="password"
								label="Password"
								placeholder="Password"
								type="password"
								autoComplete="current-password"
							/>
							<InputField
								icon={<MdMailOutline />}
								name="email"
								label="Email"
								placeholder="Email"
								type="email"
								autoComplete="email"
							/>
							<InputField
								icon={<MdMailOutline />}
								name="phone_number"
								label="Phone Number"
								placeholder="Phone Number"
								type="text"
								autoComplete="tel-local"
							/>
							<InputField
								icon={<MdOutlinePassword />}
								name="first_name"
								label="First Name"
								placeholder="First Name"
								type="text"
								autoComplete="first_name"
							/>
							<InputField
								icon={<MdOutlinePassword />}
								name="last_name"
								label="Last Name"
								placeholder="Last Name"
								type="text"
								autoComplete="last_name"
							/>
						</div>

						<Button
							className="w-full mx-auto"
							type="submit"
							isLoading={isSubmitting}
						>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterPage;
