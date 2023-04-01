import React from "react";
import toast from "react-hot-toast";
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";

const AccountOptions = () => {
	return (
		<div className="flex flex-wrap space-x-4">
			<ChangePasswordModal />

			<button
				className="btn modal-button btn-accent btn-outline"
				onClick={() => {
					toast.error("Jokes on you, we dont allow that.");
				}}
			>
				Delete Account
			</button>
		</div>
	);
};

export default AccountOptions;
