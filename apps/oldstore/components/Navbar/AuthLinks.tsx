import Link from "next/link";

const AuthLinks = () => {
	return (
		<div className="navbar-end flex sapce-y-4">
			<Link
				href="/auth/login"
				className="btn btn-link text-neutral hover:no-underline hidden lg:flex"
			>
				Log In
			</Link>
			<Link href="/auth/register" className="btn btn-primary">
				Get started
			</Link>
		</div>
	);
};

export default AuthLinks;
