import InputField from "@components/ui/InputField";
import { toErrorMap } from "@components/utils/toErrorMap";
import { useLoginMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

interface LoginFormProps {
	setGlobalError: (error: string) => void;
	setUnVerifiedEmail: (email: string) => void;
}

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string().required("Required"),
});

const LoginForm = ({ setGlobalError, setUnVerifiedEmail }: LoginFormProps) => {
	const router = useRouter();
	const [login] = useLoginMutation();

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={LoginSchema}
			onSubmit={async (values, { setErrors }) => {
				const response = await login({
					variables: {
						email: values.email,
						password: values.password,
					},
					update: (cache) => cache.evict({ fieldName: "me" }),
				});
				if (response.data?.login.errors) {
					if (response.data?.login.errors[0].field === "global") {
						setGlobalError(response.data?.login.errors[0].message);
						setUnVerifiedEmail(values.email);
					}
					setErrors(toErrorMap(response.data.login.errors));
				} else if (response.data?.login.user) {
					if (typeof router.query.redirect === "string") {
						router.replace(router.query.redirect);
					} else {
						router.replace("/");
					}
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
							<Link href="/auth/forgot-password" className="link link-secondary link-hover" passHref>
									Forgot your Password ?
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
