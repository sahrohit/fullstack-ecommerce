import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { MdMailOutline, MdOutlinePassword } from "react-icons/md";
import InputField from "../../components/ui/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { __login_page_image__ } from "../../constants";

const LoginPage: NextPage = () => {
	const [login, { data, loading }] = useLoginMutation();

	return (
		<div className="flex flex-row">
			<div className="xl:basis-2/5 lg:basis-full w-full h-screen grid place-items-center">
				<div className="w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-3xl font-bold py-1">Sign in to your account</h1>
						<p className="text-md ">
							Dont have a account,{" "}
							<Link href="/auth/register" passHref>
								<span className="text-blue-800 cursor-pointer">Register ?</span>
							</Link>
						</p>
					</div>

					<div>
						<h4 className="text-md font-bold">Sign in with</h4>
						<div className="flex justify-between gap-3">
							<button className="btn btn-outline btn-sm grow">
								<BsFacebook transform="scale(1.2)" />
							</button>
							<button className="btn btn-outline btn-sm grow">
								<BsGoogle transform="scale(1.2)" />
							</button>
							<button className="btn btn-outline btn-sm grow">
								<BsTwitter transform="scale(1.2)" />
							</button>
						</div>
					</div>

					<div className="divider text-sm text-gray-500">or continue with</div>

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
								<div className="flex flex-col gap-2">
									<InputField
										icon={<MdMailOutline />}
										name="usernameOrEmail"
										label="Username or Email"
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

									<p className="text-sm my-2 text-right">
										<Link href="/auth/forgot-password" passHref>
											<span className="text-blue-800 cursor-pointer">
												Forgot your Password ?
											</span>
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
				</div>
			</div>
			<div className="basis-0 xl:basis-3/5 h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 sm:basis-0 relative">
				<Image src={__login_page_image__} layout="fill" alt="Login Page" />
			</div>
		</div>
	);
};

export default LoginPage;
