import Logo from "@components/Logo";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useLogoutMutation, useMeQuery } from "@generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLinks from "./AuthLinks";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
	const { data, loading } = useMeQuery();
	const [logout] = useLogoutMutation({
		update: (cache) => cache.evict({ fieldName: "me" }),
	});

	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div
					className={`dropdown ${dropdownOpen && "dropdown-open"} lg:hidden`}
				>
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle swap swap-rotate"
					>
						<input
							type="checkbox"
							checked={dropdownOpen}
							onChange={(e) => setDropdownOpen(e.target.checked)}
						/>

						<svg
							className="swap-off fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 512 512"
						>
							<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
						</svg>

						<svg
							className="swap-on fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 512 512"
						>
							<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
						</svg>
					</label>
					{dropdownOpen && (
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<NavbarLinks />
						</ul>
					)}
				</div>
				<Logo />
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal p-0">
					<NavbarLinks />
				</ul>
			</div>
			{!(data && data.me) ? (
				<AuthLinks />
			) : (
				<div className="navbar-end">
					<div className="dropdown dropdown-end">
						{/* <div className="drawer drawer-end">
							<input
								id="cart-drawer"
								type="checkbox"
								className="drawer-toggle"
							/>
							<div className="drawer-content">
								<label
									tabIndex={0}
									htmlFor="cart-drawer"
									className="drawer-button btn btn-ghost btn-circle "
								>
									<div className="indicator">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										<span className="badge badge-sm indicator-item">8</span>
									</div>
								</label>
							</div>
							<div className="drawer-side">
								<label htmlFor="cart-drawer" className="drawer-overlay"></label>
								<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
									<li>
										<a>Sidebar Item 1</a>
									</li>
									<li>
										<a>Sidebar Item 2</a>
									</li>
								</ul>
							</div>
						</div> */}
					</div>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								{/* <img src="https://placeimg.com/80/80/people" /> */}
								<Image
									alt={data.me.first_name}
									src="https://placeimg.com/80/80/people"
									height="80"
									width="80"
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link href="/profile">
									<a>Profile</a>
								</Link>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a
									onClick={() => {
										toast.promise(logout(), {
											loading: "Logging out...",
											success: "Logged out Successfully!",
											error: "Something went wrong!",
										});
									}}
								>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
