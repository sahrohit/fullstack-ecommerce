import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import LoginForm from "@components/Auth/LoginForm";
import { __login_page_image__ } from "../../constants";
import { useState } from "react";
import { useResendVerificationEmailMutation } from "@generated/graphql";
import { withAuthPages } from "@components/utils/routes";

const LoginPage: NextPage = () => {
	const [resendVerificationEmail] = useResendVerificationEmailMutation();
	const [globalError, setGlobalError] = useState("");
	const [unVerifiedEmail, setUnVerifiedEmail] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<div className="flex flex-row">
			<div className="xl:basis-2/5 lg:basis-full w-full h-screen grid place-items-center">
				<div className="w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-3xl font-bold py-1">Sign in to your account</h1>
						<p className="text-md ">
							Dont have a account,{" "}
							<Link href="/auth/register" passHref>
								<span className="link link-secondary link-hover">
									Register ?
								</span>
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

					<LoginForm
						setGlobalError={setGlobalError}
						setUnVerifiedEmail={setUnVerifiedEmail}
					/>
				</div>
			</div>
			<div className="basis-0 xl:basis-3/5 h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 sm:basis-0 relative">
				<Image src={__login_page_image__} layout="fill" alt="Login Page" />
			</div>

			{globalError && (
				<div className="alert alert-warning shadow-lg absolute rounded-t-none">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="stroke-info flex-shrink-0 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<div>
							<h3 className="font-bold">{globalError}</h3>
							<div className="text-xs">
								Verify your email first to continue.
							</div>
						</div>
					</div>
					<div className="flex-none">
						<button
							className="btn btn-sm btn-ghost"
							onClick={() => {
								setGlobalError("");
							}}
						>
							Dismiss
						</button>
						<button
							className={`btn btn-sm ${loading && "loading btn-disabled"}`}
							onClick={async () => {
								setLoading(true);
								const response = await resendVerificationEmail({
									variables: {
										email: unVerifiedEmail,
									},
								});
								if (response.data?.resendVerificationEmail) {
									setGlobalError("");
								}
								setLoading(false);
							}}
						>
							Resend link
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default withAuthPages(LoginPage);
