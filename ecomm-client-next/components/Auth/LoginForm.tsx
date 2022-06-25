import InputField from "@components/ui/InputField";
import { toErrorMap } from "@components/utils/toErrorMap";
import { useLoginMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

interface LoginFormProps {
	setGlobalError: (error: string) => void;
	setUnVerifiedEmail: (email: string) => void;
}

const LoginForm = ({ setGlobalError, setUnVerifiedEmail }: LoginFormProps) => {
	const [login] = useLoginMutation();
	const router = useRouter();

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={async (values, { setErrors }) => {
				const response = await login({
					variables: {
						email: values.email,
						password: values.password,
					},
				});
				if (response.data?.login.errors) {
					if (response.data?.login.errors[0].field === "global") {
						setGlobalError(response.data?.login.errors[0].message);
						setUnVerifiedEmail(values.email);
					}
					setErrors(toErrorMap(response.data.login.errors));
				} else if (response.data?.login.user) {
					router.push("/");
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div className="flex flex-col gap-2">
						<InputField
							name="email"
							label="Email"
							placeholder="Email"
							type="text"
							autoComplete="username"
						/>
						<InputField
							name="password"
							label="Password"
							placeholder="Password"
							type="password"
							autoComplete="current-password"
						/>

						<p className="text-sm my-2 text-right">
							<Link href="/auth/forgot-password" passHref>
								<a className="link link-secondary link-hover">
									Forgot your Password ?
								</a>
							</Link>
						</p>

						<button
							className={`btn btn-primary w-full gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Sign In"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
