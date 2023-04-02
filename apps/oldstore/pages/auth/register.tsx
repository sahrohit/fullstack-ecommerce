import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@components/Auth/RegisterForm";
import { __register_page_image__ } from "../../constants";
import { withAuthPages } from "@components/utils/routes";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
	const router = useRouter();

	return (
		<div className="flex flex-row">
			<div className="basis-0 xl:basis-3/5 h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 sm:basis-0 relative">
				<Image src={__register_page_image__} layout="fill" alt="Login Page" />
			</div>
			<div className="xl:basis-2/5 lg:basis-full w-full h-screen grid place-items-center">
				<div className="w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-3xl font-bold py-1">Sign up for a account</h1>
						<p className="text-md ">
							Already have a account,{" "}
							<Link
								href={{
									pathname: "/auth/login",
									query: router.query.redirect
										? { redirect: router.query.redirect }
										: {},
								}}
								passHref
							>
								<span className="link link-secondary link-hover">Login ?</span>
							</Link>
						</p>
					</div>

					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default withAuthPages(LoginPage);
