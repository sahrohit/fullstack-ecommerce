import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { MdMailOutline, MdOutlinePassword } from "react-icons/md";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { useLoginMutation } from "../../generated/graphql";

const LoginPage: NextPage = () => {
	const [login, { data, loading }] = useLoginMutation();

	return (
		<div className="grid place-items-center h-screen">
			<Formik
				initialValues={{ usernameOrEmail: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({
						variables: {
							usernameOrEmail: values.usernameOrEmail,
							password: values.password,
						},
					});
					console.log(response);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							icon={<MdMailOutline />}
							name="usernameOrEmail"
							label="Username Or Email"
							placeholder="Username or Email"
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

export default LoginPage;
