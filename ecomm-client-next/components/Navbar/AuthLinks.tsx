import React from "react";
import Link from "next/link";

const AuthLinks = () => {
	return (
		<div className="navbar-end flex sapce-y-4">
			<Link href="/auth/login">
				<a className="btn btn-link text-neutral hover:no-underline hidden lg:flex">
					Log In
				</a>
			</Link>
			<Link href="/auth/register">
				<a className="btn btn-primary">Get started</a>
			</Link>
		</div>
	);
};

export default AuthLinks;
